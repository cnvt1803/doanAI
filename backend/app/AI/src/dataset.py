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


class HamsterDataset(Dataset):
  def __init__(self, csv_file):
    self.df = pd.read_csv(csv_file)

    self.features = self.df[["Hour", "Minute", "Second", "Temperature(C)", "Humidity(%)", "Light(lux)"]]
    # self.features = self.df[["Temperature(C)", "Humidity(%)", "Light(lux)"]]
    self.labels = self.df["Behavior"]

    self.scalar = StandardScaler()
    self.features = self.scalar.fit_transform(self.features)

    self.label_encoder = LabelEncoder()
    self.labels = self.label_encoder.fit_transform(self.labels)

    self.features = torch.tensor(self.features, dtype=torch.float32)
    self.labels = torch.tensor(self.labels, dtype=torch.long)

    print("Behavior Label Mapping:")
    for idx, class_name in enumerate(self.label_encoder.classes_):
        print(f"{idx}: {class_name}")

  def __len__(self):
    return len(self.labels)

  def __getitem__(self, idx):
    return self.features[idx], self.labels[idx]