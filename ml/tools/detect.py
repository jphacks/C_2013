import cv2
import dlib
import numpy
import os

class detect:
    def __init__(self, cascade_model_path, landmark_model_path):

        self.face_cascade = cv2.CascadeClassifier(cascade_model_path)
        self.predictor = dlib.shape_predictor(landmark_model_path)

    def detect_face_position(self):

        faces = self.face_cascade.detectMultiScale(self.gray, minSize=(100, 100))
        return faces


    def detect_facial_landmarks(self):

        faces_roi = self.detect_face_position()
        landmarks = []

        for face in faces_roi:
            x, y, w, h = face
            face_img = self.gray[y: y + h, x: x + w];

            rects = dlib.rectangle(x, y, x + w, y + h)

            landmarks = []
            landmarks.append(numpy.array([[p.x, p.y] for p in self.predictor(self.gray, rects).parts()]))

        return landmarks


    def draw_landmarks_img(self, img_path):

        img = cv2.imread(img_path)
        self.gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        landmarks = self.detect_facial_landmarks()

        for landmark in landmarks:
            for i,points in enumerate(landmark):
                cv2.putText(img, str(i), (points[0], points[1]),cv2.FONT_HERSHEY_PLAIN, 0.4, (255, 100, 12))
                # cv2.drawMarker(img, (points[0], points[1]), (255, 100, 12))

        while True:
            cv2.imshow("Image", img)
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break

        cv2.destroyAllWindows()

    def draw_landmarks_video(self):

        cap = cv2.VideoCapture(0)

        while cap.isOpened():
            ret, frame = cap.read()
            self.gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            landmarks = self.detect_facial_landmarks()

            for landmark in landmarks:
                for points in landmark:
                    cv2.drawMarker(frame, (points[0], points[1]), (21, 255, 12))

            cv2.imshow("video frame", frame)
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()