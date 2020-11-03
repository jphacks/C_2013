import cv2

import time

# from middleware.detect import detection
from middleware.fast_detect import detection

MOUTH_COLORS = [
    (128, 103, 240, 255*94/100),
    (174, 82, 217, 255*94/100),
    (117, 74, 224, 255*88/100),
    (102, 69, 247, 255*97/100),
    (247, 69, 230, 255*97/100),
    (66, 82, 237, 255*93/100),
    (170, 52, 224, 255*88/100)
]

# 上唇なら-1, 下唇なら1
MOUTH_POSITIONS = [
    (50, 51, -1),
    (52, 51, -1),
    (58, 56, 1),
    (48, 50, -1),
    (48, 58, 1),
    (54, 52, -1),
    (54, 56, 1)
]


def lip_handler(stream, lip_thickness):
    landmarks, img = detection(stream)

    for landmark in landmarks:
        # 口
        for i in range(7):
            sp_idx = MOUTH_POSITIONS[i][0]
            ep_idx = MOUTH_POSITIONS[i][1]

            if lip_thickness == 'thin':
                # 厚く
                mouth_sp = (
                    landmark[sp_idx][0],
                    landmark[sp_idx][1] + 5*MOUTH_POSITIONS[i][2]
                )
                mouth_ep = (
                    landmark[ep_idx][0],
                    landmark[ep_idx][1] + 5*MOUTH_POSITIONS[i][2]
                )
            elif lip_thickness == 'thick':
                # 薄く
                mouth_sp = (
                    landmark[sp_idx][0],
                    landmark[sp_idx][1] + 5*MOUTH_POSITIONS[i][2]*(-1)
                )
                mouth_ep = (
                    landmark[ep_idx][0],
                    landmark[ep_idx][1] + 5*MOUTH_POSITIONS[i][2]*(-1)
                )
            else:
                # 普通
                mouth_sp = (landmark[sp_idx][0], landmark[sp_idx][1])
                mouth_ep = (landmark[ep_idx][0], landmark[ep_idx][1])

            img = cv2.arrowedLine(img, mouth_sp, mouth_ep, MOUTH_COLORS[i], 2)

    result, dst_data = cv2.imencode('.png', img)
    cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
