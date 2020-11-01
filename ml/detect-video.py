import cv2
import dlib
import numpy
import os

# Cascade files directory path
predictor = dlib.shape_predictor('learned-models/helen-dataset.dat')
face_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')
os.makedirs("results", exist_ok=True)

def face_position(gray_img):
    """Detect faces position
    Return:
        faces: faces position list (x, y, w, h)
    """
    faces = face_cascade.detectMultiScale(gray_img, minSize=(100, 100))
    return faces


def facemark(gray_img):
    """Recoginize face landmark position by i-bug 300-w dataset
    Return:
        randmarks = [
        [x, y],
        [x, y],
        ...
        ]
        [0~40]: chin
        [41~57]: nose
        [58~85]: outside of lips
        [86-113]: inside of lips
        [114-133]: right eye
        [134-153]: left eye
        [154-173]: right eyebrows
        [174-193]: left eyebrows
    """
    """
    [0~40]: chin
    [41~60]: right eye
    [61~79]: left eye
    """
    faces_roi = face_position(gray_img)
    landmarks = []

    for face in faces_roi:
        x, y, w, h = face
        face_img = gray_img[y: y + h, x: x + w];

        rect=dlib.rectangle(x, y, x + w, y + h)

        landmarks = []
        landmarks.append(
            numpy.array(
                [[p.x, p.y] for p in predictor(gray_img, rect).parts()])
            )
    return landmarks


if __name__ == '__main__':
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        landmarks = facemark(gray)

        for landmark in landmarks:
            for points in landmark:
                cv2.drawMarker(frame, (points[0], points[1]), (21, 255, 12))
        cv2.imshow("video frame", frame)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
        cv2.imshow("video frame",frame)
    cap.release()
    cv2.destroyAllWindows()