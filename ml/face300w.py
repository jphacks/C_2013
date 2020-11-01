# ------------------------------------------------------------------------------
# Copyright (c) Microsoft
# Licensed under the MIT License.
# Created by Tianheng Cheng(tianhengcheng@gmail.com), Yang Zhao
# ------------------------------------------------------------------------------

import os
import random

import torch
import torch.utils.data as data
import pandas as pd
from PIL import Image
import numpy as np


class Face300W(data.Dataset):

    def __init__(self, cfg, is_train=True, transform=None):
        self.mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
        self.std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
        self.input_size = cfg.MODEL.IMAGE_SIZE  

    def __getitem__(self, idx):
        image_path="./img/1.jpg"
        model="./haar_cascade/haarcascade_frontalface_default.xml"
        face_cascade = cv2.CascadeClassifier(model)
        img = np.array(Image.open(image_path).convert('RGB'), dtype=np.float32)

        faces = face_cascade.detectMultiScale(img)
        for (x,y,w,h) in faces:
            scale=max(w, h)/200
            center_w=(x+x+w)/2
            center_h=(y+y+h)/2
        center = torch.Tensor([center_w, center_h])
        img = crop(img, center, scale, self.input_size, rot=0)
        img = img.astype(np.float32)
        img = (img/255.0 - self.mean) / self.std
        img = img.transpose([2, 0, 1])
        return img

