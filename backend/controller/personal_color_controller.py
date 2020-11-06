import cv2
import numpy as np

from personal_color import predict_Personal_Color


def predict_personal_color(img):
    rate = predict_Personal_Color(img)

    result = max(rate)

    return {'result': result}


if __name__ == "__main__":
    pass
