import os
from glob import glob

import numpy as np
from PIL import Image, ImageFile
from pytorch_lightning import seed_everything
import torchvision.transforms as transforms
from io import BytesIO
import base64

import ml_model

ImageFile.LOAD_TRUNCATED_IMAGES = True


transform = transforms.Compose([
    transforms.Resize(400),
    transforms.CenterCrop(384),
    # transforms.RandomRotation([-10, 10]),
    # transforms.RandomCrop(384),
    # transforms.RandomHorizontalFlip(p=0.5),
    # transforms.RandomVerticalFlip(p=0.5),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))])

"""
0:autumn
1:spring
2:summer
3:winter
"""
PRETRAINED = "learned-models/epoch=572.ckpt"


def predict_Personal_Color(data):

    predict_model = ml_model.FineTuningModel.load_from_checkpoint(PRETRAINED)
    predict_model.eval()

    img = Image.open(BytesIO(base64.b64decode(data))).convert('RGB')
    # img = Image.open('../../backend/img/input_1.jpg')
    img = transform(img)
    img = img.unsqueeze(0)

    output = predict_model(img).squeeze(0).detach().numpy()
    rate = {"autumn": output[0], "spring": output[1], "summer": output[2], "winter": output[3]}

    return rate


if __name__ == "__main__":
    print(predict_Personal_Color())
