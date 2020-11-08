import cv2

import time

# from middleware.detect import detection
from middleware.fast_detect import detection


def cheak_handler(stream):
    landmarks, img = detection(stream, )

    for landmark in landmarks:
        left_cheak_sp = (landmark[40][0]-5, landmark[29][1]+10)
        left_cheak_ep = (landmark[17][0]-5, landmark[29][1]+10)
        right_cheak_sp = (landmark[47][0]+5, landmark[29][1]+10)
        right_cheak_ep = (landmark[26][0]+5, landmark[29][1]+10)
        left_cheak_sp2 = (landmark[40][0]-5, landmark[40][1]+10)
        left_cheak_ep2 = (landmark[17][0]-5, landmark[40][1]+10)
        right_cheak_sp2 = (landmark[47][0]+5, landmark[46][1]+10)
        right_cheak_ep2 = (landmark[26][0]+5, landmark[46][1]+10)
        img = cv2.line(img, left_cheak_sp, left_cheak_ep, (255, 255, 255, 255), 3)
        img = cv2.line(img, right_cheak_sp, right_cheak_ep, (255, 255, 255, 255), 3)
        img = cv2.line(img, left_cheak_sp2, left_cheak_ep2, (255, 255, 255, 255), 3)
        img = cv2.line(img, right_cheak_sp2, right_cheak_ep2, (255, 255, 255, 255), 3)

        left_cheak_sp3 = (landmark[40][0]-5, landmark[40][1]+10)
        left_cheak_ep3 = (landmark[40][0]-5, landmark[29][1]+10)
        right_cheak_sp3 = (landmark[47][0]+5, landmark[46][1]+10)
        right_cheak_ep3 = (landmark[47][0]+5, landmark[29][1]+10)
        left_cheak_sp4 = (landmark[17][0]-5, landmark[40][1]+10)
        left_cheak_ep4 = (landmark[17][0]-5, landmark[29][1]+10)
        right_cheak_sp4 = (landmark[26][0]+5, landmark[47][1]+10)
        right_cheak_ep4 = (landmark[26][0]+5, landmark[29][1]+10)
        img = cv2.line(img, left_cheak_sp3, left_cheak_ep3, (255, 255, 255, 255), 3)
        img = cv2.line(img, right_cheak_sp3, right_cheak_ep3, (255, 255, 255, 255), 3)
        img = cv2.line(img, left_cheak_sp4, left_cheak_ep4, (255, 255, 255, 255), 3)
        img = cv2.line(img, right_cheak_sp4, right_cheak_ep4, (255, 255, 255, 255), 3)

    result, dst_data = cv2.imencode('.png', img)
    # cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
