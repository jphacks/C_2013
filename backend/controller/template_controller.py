from ..middleware.fast_detect import detection


def make_eyebrow(img):
    landmarks, img = detection(img)
    for landmark in landmarks:
        print(landmark)
        # ここで眉を切り取って処理

    return True, {'message': 'hogehoge'}


if __name__ == "__main__":
    pass
