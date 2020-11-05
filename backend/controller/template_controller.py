import cv2
import numpy as np
import boto3

from middleware.fast_detect import detection
from db import database
from model.template_model import Template

import time
import io


def surround_eyebrow(img):
    landmarks, img = detection(img, 'SURROUNDER')
    for landmark in landmarks:
        #right_pts1 = landmark[84:90]
        #right_pts2 = landmark[91:101]
        #right_pts3 = landmark[102:106]
        left_pts1 = landmark[62:68]
        left_pts2 = landmark[69:79]
        left_pts3 = landmark[80:84]
        left_pts = np.concatenate([left_pts1, left_pts2, left_pts3])

        return left_pts


def make_eyebrow(img, cfg):
    is_success = True
    res = {'message': 'success'}

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
        img_name = '{}/{}.png'.format(s3_dir, str(time.time()))
        response = s3.put_object(
            Body=dst_data.tostring(),
            Bucket=s3_bucket,
            Key=img_name
        )
        print(response)
        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
            is_success = False
            res = {'message': 'faild uploading to s3'}
        else:
            name = img_name
            uri = 'uri'
            template = Template(name=name, uri=uri)
            database.db.session.add(template)
            database.db.session.commit()

        cv2.imwrite("./result/{}.png".format(str(time.time())), left_eyebrow)

    return is_success, res


if __name__ == "__main__":
    pass
