import cv2
import dlib
import numpy
import os


def detect_face_position(gray_img, cascade_model_path):

    face_cascade = cv2.CascadeClassifier(cascade_model_path)
    faces = face_cascade.detectMultiScale(gray_img, minSize=(100, 100))
    return faces


def detect_facial_landmarks(gray_img, cascade_model_path, landmark_model_path):

    predictor = dlib.shape_predictor(landmark_model_path)
    faces_roi = detect_face_position(gray_img, cascade_model_path)
    landmarks = []

    for face in faces_roi:
        x, y, w, h = face
        face_img = gray_img[y: y + h, x: x + w]

        rects = dlib.rectangle(x, y, x + w, y + h)
        landmarks = []
        landmarks.append(numpy.array(
            [[p.x, p.y] for p in predictor(gray_img, rects).parts()]))
    return landmarks


def draw_landmarks(img_path, cascade_model_path, landmark_model_path):

    img = cv2.imread(img_path)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    landmarks = detect_facial_landmarks(
        gray_img, cascade_model_path, landmark_model_path)

    for landmark in landmarks:
        for i, points in enumerate(landmark):
            cv2.putText(img, str(
                i), (points[0], points[1]), cv2.FONT_HERSHEY_PLAIN, 0.4, (255, 100, 12))
            # cv2.drawMarker(img, (points[0], points[1]), (255, 100, 12))

    while True:
        cv2.imshow("Image", img)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

    cv2.destroyAllWindows()
