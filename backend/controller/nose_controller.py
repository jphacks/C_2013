import cv2

import time

from middleware.detect import detection


def nose_handler(stream):
    landmarks, img = detection(stream)

    for landmark in landmarks:
        # 鼻
        nose_sp = (landmark[27][0], landmark[27][1])
        nose_ep = (landmark[30][0], landmark[30][1])
        img = cv2.line(img, nose_sp, nose_ep, (255, 0, 0), 5)

    result, dst_data = cv2.imencode('.png', img)
    cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
