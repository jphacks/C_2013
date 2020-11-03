from middleware.fast_detect import detection


def surround_eyebrow(img):
    landmarks, img = detection(img, 'SURROUNDER')

    return landmarks


def make_eyebrow(img):
    surround_eyebrow(img)
    landmarks, img = detection(img)
    for landmark in landmarks:
        print(len(landmark))
        # ここで眉を切り取って処理

    return True, {'message': 'hogehoge'}


if __name__ == "__main__":
    pass
