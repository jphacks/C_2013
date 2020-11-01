import cv2
import dlib
import numpy as np
from flask import Flask

import base64
import time

app = Flask(__name__)

app.config.from_json('../config/config.json')
cfg = app.config

# OpenCVのカスケードファイルと学習済みモデルのパスを指定
CASCADE_PATH = cfg["CASCADEPASS"]
CASCADE = cv2.CascadeClassifier(
    CASCADE_PATH + cfg["CASCADE"])

LEARNED_MODEL_PATH = cfg["LEARNEDMODELPATH"]
PREDICTOR = dlib.shape_predictor(
    LEARNED_MODEL_PATH + cfg["LEARNEDMODEL"])

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


def face_position(gray_img):
    # 顔の位置を検出　return:リスト(x,y,w,h)
    faces = CASCADE.detectMultiScale(gray_img, minSize=(100, 100))
    return faces


def facemark(gray_img):
    # ランドマーク検出
    faces_roi = face_position(gray_img)
    landmarks = []

    for face in faces_roi:
        detector = dlib.get_frontal_face_detector()
        rects = detector(gray_img, 1)
        landmarks = []

        for rect in rects:
            landmarks.append(
                np.array([[p.x, p.y] for p in PREDICTOR(gray_img, rect).parts()]))

    return landmarks


def calc_mayu_size(landmarks):
    # まゆの幅
    r_mayu_len = landmarks[4][0] - landmarks[0][0]
    l_mayu_len = landmarks[9][0] - landmarks[5][0]
    ave_mayu_len = (r_mayu_len+l_mayu_len)/2

    # 両まゆ間の距離
    mayu_dist = landmarks[5][0] - landmarks[4][0]

    return ave_mayu_len, mayu_dist


def synth_mayu_temp(f_img, b_img, pos, isflip=False):
    if isflip:
        # 左眉
        f_img = cv2.flip(f_img, 1)  # 反転
        x_pos = pos[0] - f_img.shape[1]
    else:
        # 右眉
        x_pos = pos[0]
    y_pos = int(pos[1] - f_img.shape[0]*(4/5))

    # create a ROI
    rows, cols, channels = f_img.shape
    roi = b_img[y_pos:rows+y_pos, x_pos:cols+x_pos]

    # create a mask and create its inverse mask
    f_img_gray = cv2.cvtColor(f_img, cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(f_img_gray, 10, 255, cv2.THRESH_BINARY)
    mask_inv = cv2.bitwise_not(mask)

    # black-out the area of img in ROI
    b_img_bg = cv2.bitwise_and(roi, roi, mask=mask_inv)

    # Take only region of template from image.
    f_img_bg = cv2.bitwise_and(f_img, f_img, mask=mask)

    # Put template in ROI and modify the main image
    dst = cv2.add(b_img_bg, f_img_bg)
    b_img[y_pos:rows+y_pos, x_pos:cols+x_pos] = dst

    return b_img


def resize_mayu(temp_img, mayu_len):
    height = temp_img.shape[0]
    width = temp_img.shape[1]
    ratio = mayu_len / width
    temp_img = cv2.resize(temp_img, (int(width*ratio), int(height*ratio)))

    return temp_img


def detection(stream, lip_thickness):
    # imageはping!!
    # drawlineの時のcolorは(g,b,r,a) (0<g,b,r,a,<255)

    img_binary = base64.b64decode(stream)
    img_array = np.frombuffer(img_binary, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # 処理を早くするためグレースケールに変換
    landmarks = facemark(gray)  # ランドマーク検出

    for landmark in landmarks:
        # まゆのサイズを計算 [17-27]
        mayu_len, mayu_dist = calc_mayu_size(landmark[17:27])

        # テンプレート画像貼り付け
        mayu_img = cv2.imread(
            './template-images/mayu-1.png', cv2.IMREAD_UNCHANGED)
        mayu_img = resize_mayu(mayu_img, mayu_len)
        img = synth_mayu_temp(mayu_img, img, landmark[22], False)  # 左眉
        img = synth_mayu_temp(mayu_img, img, landmark[21], True)  # 右眉

        # 鼻
        nose_sp = (landmark[27][0], landmark[27][1])
        nose_ep = (landmark[30][0], landmark[30][1])
        img = cv2.line(img, nose_sp, nose_ep, (255, 0, 0), 5)

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


if __name__ == '__main__':
    pass
