import cv2
import numpy as np

import time
import urllib
from PIL import Image
# from middleware.detect import detection
from middleware.fast_detect import detection


def cv2pil(image):
    ''' OpenCV型 -> PIL型 '''
    new_image = image.copy()
    if new_image.ndim == 2:  # モノクロ
        pass
    elif new_image.shape[2] == 3:  # カラー
        new_image = cv2.cvtColor(new_image, cv2.COLOR_BGR2RGB)
    elif new_image.shape[2] == 4:  # 透過
        new_image = cv2.cvtColor(new_image, cv2.COLOR_BGRA2RGBA)
    new_image = Image.fromarray(new_image)
    return new_image


def pil2cv(image):
    ''' PIL型 -> OpenCV型 '''
    new_image = np.array(image, dtype=np.uint8)
    if new_image.ndim == 2:  # モノクロ
        pass
    elif new_image.shape[2] == 3:  # カラー
        new_image = cv2.cvtColor(new_image, cv2.COLOR_RGB2BGR)
    elif new_image.shape[2] == 4:  # 透過
        new_image = cv2.cvtColor(new_image, cv2.COLOR_RGBA2BGRA)
    return new_image


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
    y_pos = int(pos[1] - f_img.shape[0] * (4 / 5))

    layer1 = cv2pil(b_img).convert('RGBA')
    layer2 = cv2pil(f_img).convert('RGBA')

    c = Image.new('RGBA', layer1.size, (255, 255, 255, 0))

    mask = layer2.copy()

    layer2.putalpha(80)
    c.paste(layer2, (x_pos, y_pos), mask=mask)

    result = Image.alpha_composite(layer1, c)

    return pil2cv(result)


def resize_mayu(temp_img, mayu_len):
    height = temp_img.shape[0]
    width = temp_img.shape[1]
    ratio = mayu_len / width
    temp_img = cv2.resize(temp_img, (int(width*ratio), int(height*ratio)))

    return temp_img


def mayu_handler(stream, img_uri):
    landmarks, img = detection(stream)

    for landmark in landmarks:
        # まゆのサイズを計算 [17-27]
        mayu_len, mayu_dist = calc_mayu_size(landmark[17:27])

        # テンプレート画像貼り付け
        resp = urllib.request.urlopen(img_uri)
        mayu_byte = np.asarray(bytearray(resp.read()), dtype="uint8")
        mayu_img = cv2.imdecode(mayu_byte, cv2.IMREAD_UNCHANGED)
        # mayu_img = cv2.imread('./template-images/mayu-1.png', cv2.IMREAD_UNCHANGED)
        mayu_img = resize_mayu(mayu_img, mayu_len)
        img = synth_mayu_temp(mayu_img, img, landmark[22], False)  # 左眉
        img = synth_mayu_temp(mayu_img, img, landmark[21], True)  # 右眉

    result, dst_data = cv2.imencode('.png', img)
    # cv2.imwrite("./result/{}.png".format(str(time.time())), img)

    return dst_data


if __name__ == "__main__":
    pass
