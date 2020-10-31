import cv2
import dlib
import numpy as np

import base64
import time

# OpenCVのカスケードファイルと学習済みモデルのパスを指定
CASCADE_PATH = "./haarcascades/"
CASCADE = cv2.CascadeClassifier(
    CASCADE_PATH + 'haarcascade_frontalface_default.xml')

LEARNED_MODEL_PATH = "./learned-models/"
PREDICTOR = dlib.shape_predictor(
    LEARNED_MODEL_PATH + 'shape_predictor_68_face_landmarks.dat')


def face_position(gray_img):
    # 顔の位置を検出　返却値は位置を表すリスト(x,y,w,h)
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


def main(stream):
    # img = cv2.imread("./img/input.jpg")  # 自分の画像に置き換え
    # img_array = np.asarray(bytearray(stream.read()), dtype=np.uint8)
    # img = cv2.imdecode(img_array, 1)

    img_binary = base64.b64decode(stream)
    jpg = np.frombuffer(img_binary, dtype=np.uint8)
    img = cv2.imdecode(jpg, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # 処理を早くするためグレースケールに変換
    landmarks = facemark(gray)  # ランドマーク検出

    # ランドマークの描画
    for landmark in landmarks:
        for points in landmark:
            cv2.drawMarker(img, (points[0], points[1]), (21, 255, 12))

    result, dst_data = cv2.imencode('.png', img)

    # 保存
    # img_name = "./result/" + str(time.time()) + ".png"
    # cv2.imwrite(img_name, img)
    # cv2.destroyAllWindows()

    return dst_data

    # # 表示
    # cv2.imshow("video frame", img)
    # cv2.waitKey(0)


if __name__ == '__main__':
    main()
