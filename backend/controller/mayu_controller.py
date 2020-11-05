import cv2
import numpy as np

import time
import urllib

# from middleware.detect import detection
from middleware.fast_detect import detection


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


def mayu_handler(stream):
    landmarks, img = detection(stream)

    for landmark in landmarks:
        # まゆのサイズを計算 [17-27]
        mayu_len, mayu_dist = calc_mayu_size(landmark[17:27])

        # テンプレート画像貼り付け
        mayu_img = cv2.imread('./template-images/mayu-1.png', cv2.IMREAD_UNCHANGED)
        # resp = urllib.request.urlopen('https://jphacks2020.s3-ap-northeast-1.amazonaws.com/templates/mayu-1.png')
        # mayu_img = np.asarray(bytearray(resp.read()), dtype='uint8')
        # mayu_img = cv2.imdecode(mayu_img, cv2.IMREAD_UNCHANGED)
        mayu_img = resize_mayu(mayu_img, mayu_len)
        img = synth_mayu_temp(mayu_img, img, landmark[22], False)  # 左眉
        img = synth_mayu_temp(mayu_img, img, landmark[21], True)  # 右眉

    result, dst_data = cv2.imencode('.png', img)
    cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
