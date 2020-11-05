import cv2
import numpy as np
import boto3

from middleware.fast_detect import detection

import time
import io


def surround_eyebrow(img):
    landmarks, img = detection(img, 'SURROUNDER')
    for landmark in landmarks:
        #left_pts1 = landmark[84:90]
        #left_pts2 = landmark[91:101]
        #left_pts3 = landmark[102:106]
        left_pts1 = landmark[62:68]
        left_pts2 = landmark[69:79]
        left_pts3 = landmark[80:84]
        left_pts = np.concatenate([left_pts1, left_pts2, left_pts3])

        return left_pts


def make_eyebrow(img, cfg):
    left_pts = surround_eyebrow(img)
    landmarks, img = detection(img)
    for landmark in landmarks:
        cv2.rectangle(img, (landmark[22][0]-5, landmark[22][1]-30), (landmark[26][0]+5, landmark[22][1]+30), (0, 0, 0, 0), cv2.FILLED)
        #left_eyebrow = cv2.polylines(img, [left_pts], True, (200, 0, 0, 200))
        left_eyebrow = cv2.fillPoly(img, [left_pts], (255, 0, 0, 255))

        # ここで眉を切り取って処理
        left_eyebrow = img[landmark[22][1]-30:landmark[22][1]+30, landmark[22][0]-5:landmark[26][0]+5]
        dst_data = cv2.imencode('.png', left_eyebrow)[1]

        # upload to s3
        s3_bucket = cfg['S3_BUCKET']
        s3_dir = cfg['S3_DIR']
        s3 = boto3.client('s3', region_name='ap-northeast-1')
        response = s3.put_object(
            Body=dst_data.tostring(),
            Bucket=s3_bucket,
            Key='{}/{}.png'.format(s3_dir, str(time.time()))
        )
        print(response)

        cv2.imwrite("./result/{}.png".format(str(time.time())), left_eyebrow)
    return True, {'message': 'hogehoge'}


if __name__ == "__main__":
    pass
