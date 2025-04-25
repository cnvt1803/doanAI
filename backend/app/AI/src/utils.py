import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader, random_split
import torch.optim as optim
from math import sin, cos, pi
import matplotlib.pyplot as plt
import copy
import joblib
from pathlib import Path


def preprocess_single_sample_with_time(sample_dict, scaler):
    df_input = pd.DataFrame([[
        sample_dict["Hour"],
        sample_dict["Minute"],
        sample_dict["Second"],
        sample_dict["Temperature"],
        sample_dict["Humidity"],
        sample_dict["Light"]
    ]], columns=["Hour", "Minute", "Second", "Temperature(C)", "Humidity(%)", "Light(lux)"])

    normalized = scaler.transform(df_input)

    input_tensor = torch.tensor(normalized, dtype=torch.float32)
    return input_tensor