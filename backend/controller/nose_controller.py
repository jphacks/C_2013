import cv2

import time

from middleware.detect import detection


def nose_handler(stream):
    landmarks, img = detection(stream)

    for landmark in landmarks:
        # 鼻
        nose_sp = (landmark[27][0], landmark[27][1])
        nose_ep = (landmark[30][0], landmark[30][1])
        img = cv2.line(img, nose_sp, nose_ep, (255, 255, 255, 255), 5)
        # 額
        left_forehead_sp = (landmark[21][0], landmark[21][1]-20)
        left_forehead_ep = (landmark[18][0], landmark[19][1]-15)
        right_forehead_sp = (landmark[22][0], landmark[22][1]-20)
        right_forehead_ep = (landmark[25][0], landmark[24][1]-15)
        img = cv2.line(img, left_forehead_sp, left_forehead_ep,
                       (255, 255, 255, 255), 5)
        img = cv2.line(img, right_forehead_sp,
                       right_forehead_ep, (255, 255, 255, 255), 5)

    result, dst_data = cv2.imencode('.png', img)
    cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
