# ------------------------------------------------------------------------------
# Copyright (c) Microsoft
# Licensed under the MIT License.
# Create by Bin Xiao (Bin.Xiao@microsoft.com)
# Modified by Tianheng Cheng(tianhengcheng@gmail.com), Yang Zhao
# ------------------------------------------------------------------------------

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import logging

import torch
import torch.nn as nn
import torch.nn.functional as F


param=torch.load('./pretrained/hrnetv2_w18_imagenet_pretrained.pt')h
state_dict = torch.load(args.model_file)
if 'state_dict' in state_dict.keys():
    state_dict = state_dict['state_dict']
    model.load_state_dict(state_dict)
else:
    model.module.load_state_dict(state_dict)

model.load_state_dict(param)
torch.save(model.state_dict().to('cpu'), 'model_cpu.pth')