import cv2
import dlib
import numpy as np
from flask import Flask

import base64

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


def detection(stream, model='PREDICTOR'):
    # imageはping!!
    # drawlineの時のcolorは(g,b,r,a) (0<g,b,r,a,<255)

    img_binary = base64.b64decode(stream)
    img_array = np.frombuffer(img_binary, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # 処理を早くするためグレースケールに変換
    landmarks = facemark(gray, model)  # ランドマーク検出

    return landmarks, img


if __name__ == '__main__':
    pass
