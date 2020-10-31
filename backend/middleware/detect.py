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


def detection(stream):
    img_binary = base64.b64decode(stream)
    img_array = np.frombuffer(img_binary, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # 処理を早くするためグレースケールに変換
    landmarks = facemark(gray)  # ランドマーク検出

    # ランドマークの描画
    for landmark in landmarks:
        # まゆ
        # for points in landmark[18:27]:
        #     cv2.drawMarker(
        #         img, (points[0], points[1]), (21, 255, 12))

        # 鼻
        # for points in landmark[28:31]:
        #     cv2.drawMarker(
        #         img, (points[0], points[1]), (21, 255, 12))
        nose_sp = (landmark[28][0], landmark[28][1])
        nose_ep = (landmark[30][0], landmark[30][1])
        img = cv2.line(img, nose_sp, nose_ep, (255, 0, 0), 5)

        # 口
        for points in landmark[49:60]:
            cv2.drawMarker(
                img, (points[0], points[1]), (21, 255, 12))

    result, dst_data = cv2.imencode('.png', img)

    cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == '__main__':
    pass
