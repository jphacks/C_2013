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
        for points in landmark[18:27]:
            # cv2.drawMarker(
            #     img, (points[0], points[1]), (21, 255, 12))
            img = cv2.line(img, (points[0], points[1]-10),
                           (points[0], points[1]-10), (21, 255, 12), 5)
            img = cv2.line(img, (points[0], points[1]+10),
                           (points[0], points[1]+10), (21, 255, 12), 5)

        # 眉をかく
        # mayu_sp = (landmark[18][0], landmark[18][1])
        # mayu_ep = (landmark[26][0], landmark[26][1])
        # img = cv2.line(img, mayu_sp, mayu_ep, (255, 0, 0), 5)

        # 画像貼り付け
        # mayu_img = cv2.imread(
        #     './template-images/mayu-1.png', cv2.IMREAD_UNCHANGED)

        # b_channel, g_channel, r_channel = cv2.split(img)
        # alpha_channel = np.ones(b_channel.shape, dtype=b_channel.dtype) * 50
        # img = cv2.merge((b_channel, g_channel, r_channel, alpha_channel))

        # cv2.imwrite("./result/{}.png".format(str(time.time())), img)

        # height, width = mayu_img.shape[:2]
        # img[100:height + 100, 200:width + 200] = mayu_img

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
