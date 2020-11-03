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
CASCADE = cv2.CascadeClassifier(CASCADE_PATH + cfg["CASCADE"])

LEARNED_MODEL_PATH = cfg["LEARNEDMODELPATH"]
MODEL = {}
MODEL['PREDICTOR'] = dlib.shape_predictor(LEARNED_MODEL_PATH + cfg["DETECTMODEL"])
MODEL['SURROUNDER'] = dlib.shape_predictor(LEARNED_MODEL_PATH + cfg['SURROUNDMODEL'])


def face_position(gray_img):
    # 顔の位置を検出　return:リスト(x,y,w,h)
    faces = CASCADE.detectMultiScale(gray_img, minSize=(100, 100))
    return faces


def facemark(gray_img, model):
    # ランドマーク検出
    faces_roi = face_position(gray_img)
    landmarks = []

    for face in faces_roi:
        detector = dlib.get_frontal_face_detector()
        rects = detector(gray_img, 1)
        landmarks = []

        for rect in rects:
            landmarks.append(
                np.array([[p.x, p.y] for p in MODEL[model](gray_img, rect).parts()]))

    return landmarks


def detect_dots(stream, model='PREDICTOR'):
    img_binary = base64.b64decode(stream)
    jpg = np.frombuffer(img_binary, dtype=np.uint8)
    img = cv2.imdecode(jpg, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # 処理を早くするためグレースケールに変換
    landmarks = facemark(gray, model)  # ランドマーク検出

    b_channel, g_channel, r_channel = cv2.split(img)
    alpha_channel = np.zeros(b_channel.shape, dtype=b_channel.dtype)
    img_BGRA = cv2.merge((b_channel, g_channel, r_channel, alpha_channel))

    # ランドマークの描画
    for landmark in landmarks:
        for points in landmark:
            cv2.drawMarker(
                img_BGRA, (points[0], points[1]), (21, 255, 12, 100))

    result, dst_data = cv2.imencode('.png', img_BGRA)

    # cv2.imwrite("./result/{}.png".format(str(time.time())), img_BGRA)

    return dst_data


if __name__ == '__main__':
    pass
