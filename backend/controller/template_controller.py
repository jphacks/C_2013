import cv2
import time
from middleware.fast_detect import detection


def make_eyebrow(img):
    landmarks, img = detection(img)
    for landmark in landmarks:
        print(landmark)
        # ここで眉を切り取って処理
        left_eyebrow = img[landmark[22][1]-30:landmark[22][1]+30, landmark[22][0]-5:landmark[26][0]+5]
        cv2.imwrite("./result/{}.png".format(str(time.time())), left_eyebrow)
    return True, {'message': 'hogehoge'}


if __name__ == "__main__":
    pass
