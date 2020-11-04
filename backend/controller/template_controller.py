import cv2
import time
import numpy as np
from middleware.fast_detect import detection


def surround_eyebrow(img):
    landmarks, img = detection(img, 'SURROUNDER')
    for landmark in landmarks:
        #left_pts1 = landmark[84:90]
        #left_pts2 = landmark[91:101]
        #left_pts3 = landmark[102:106]
        left_pts1 = landmark[62:68]
        left_pts2 = landmark[69:79]
        left_pts3 = landmark[80:84]
        left_pts = np.concatenate([left_pts1,left_pts2, left_pts3])

        return left_pts


def make_eyebrow(img):
    left_pts = surround_eyebrow(img)
    landmarks, img = detection(img)
    for landmark in landmarks:
        print(len(landmark))
        cv2.rectangle(img, (landmark[22][0]-5, landmark[22][1]-30), (landmark[26][0]+5, landmark[22][1]+30),(0, 0, 0, 0), cv2.FILLED)
        #left_eyebrow = cv2.polylines(img, [left_pts], True, (200, 0, 0, 200))
        left_eyebrow = cv2.fillPoly(img, [left_pts], (255, 0, 0, 255))
        # ここで眉を切り取って処理
        left_eyebrow = img[landmark[22][1]-30:landmark[22][1]+30, landmark[22][0]-5:landmark[26][0]+5]
        cv2.imwrite("./result/{}.png".format(str(time.time())), left_eyebrow)
    return True, {'message': 'hogehoge'}


if __name__ == "__main__":
    pass
