import os
import pprint
import argparse
import math

import cv2

from PIL import Image
import numpy as np
import torch
import torch.nn as nn
import torch.backends.cudnn as cudnn
from torch.utils.data import DataLoader
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import lib.models as models
from lib.config import config, update_config
from lib.utils import utils,transforms
from lib.core import function, evaluation
from face300w import Face300W

model_path="models/pretrained.pth"
config_path="config.yaml"
update_config(config, config_path)
os.makedirs("results", exist_ok=True)
def main():
    cudnn.benchmark = config.CUDNN.BENCHMARK
    cudnn.determinstic = config.CUDNN.DETERMINISTIC
    cudnn.enabled = config.CUDNN.ENABLED
    input_size = config.MODEL.IMAGE_SIZE  
    config.defrost()
    config.MODEL.INIT_WEIGHTS = False
    config.freeze()
    model = models.get_face_alignment_net(config)
    gpus = list(config.GPUS)
    model = nn.DataParallel(model, device_ids=gpus).cuda()

    # load model
    state_dict = torch.load(model_path)
    if 'state_dict' in state_dict.keys():
        state_dict = state_dict['state_dict']
        model.load_state_dict(state_dict, strict=False)
    else:
        model.module.load_state_dict(state_dict, strict=False)
    model.eval()
    image_path="./img/1.jpg"
    cascade_model="./haar_cascade/haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(cascade_model)
    img=Image.open(image_path).convert('RGB')
    ocv_im = np.asarray(img)
    faces = face_cascade.detectMultiScale(ocv_im[:, :, ::-1])
    for (x,y,w,h) in faces:
        scale=max(w, h)/200
        center_w=(x+x+w)/2
        center_h=(y+y+h)/2
    center = torch.Tensor([center_w, center_h])

    img = np.array(img, dtype=np.float32)
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    img = transforms.crop(img, center, scale, input_size, rot=0)
    img = img.astype(np.float32)
    img = (img/255.0 - mean) / std
    img = img.transpose([2, 0, 1])
    img=torch.Tensor(img)
    img=img.unsqueeze(0)
    with torch.no_grad():
        output=model(img)
        score_map = output.data.cpu()
        coords = evaluation.get_preds(output)  # float type

        coords = coords.cpu()
        res= [64, 64]
        # pose-processing
        for n in range(coords.size(0)):
            for p in range(coords.size(1)):
                hm = output[n][p]
                px = int(math.floor(coords[n][p][0]))
                py = int(math.floor(coords[n][p][1]))
                if (px > 1) and (px < res[0]) and (py > 1) and (py < res[1]):
                    diff = torch.Tensor([hm[py - 1][px] - hm[py - 1][px - 2], hm[py][px - 1]-hm[py - 2][px - 1]])
                    coords[n][p] += diff.sign() * .25
        coords += 0.5
        preds = coords.clone()
        for i in range(coords.size(0)):
            preds[i] = transforms.transform_preds(coords[i], center, scale, res)
        b = preds[0].clone().numpy()
        print(b)
        src = cv2.imread(image_path)
        for x,y in b:
            cv2.drawMarker(src,(x,y),(255,255,50))
        cv2.imwrite('results/output.jpg',src)
if __name__ == '__main__':
    main()