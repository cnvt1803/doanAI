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

class NeuralNetwork(nn.Module):
  def __init__(self, num_of_features = 6, num_of_output_classes = 3):
    super(NeuralNetwork, self).__init__()

    self.hidden_layer_1 = nn.Linear(num_of_features, 64)
    self.bn1 = nn.BatchNorm1d(64)

    # self.hidden_layer_2 = nn.Linear(64, 64)
    # self.bn2 = nn.BatchNorm1d(64)

    self.hidden_layer_3 = nn.Linear(64, 32)
    self.bn3 = nn.BatchNorm1d(32)

    self.output_layer = nn.Linear(32, num_of_output_classes)

    self.loss_function = nn.CrossEntropyLoss()
    self.optimizer = optim.Adam(self.parameters(), lr=0.0001, weight_decay=1e-4)

    self.dropout = nn.Dropout(p=0.4)

  def forward(self, input_tensor):
    x = self.hidden_layer_1(input_tensor)
    x = self.bn1(x)
    x = F.relu(x)
    x = self.dropout(x)

    # x = self.hidden_layer_2(x)
    # x = self.bn2(x)
    # x = F.relu(x)
    # x = self.dropout(x)

    x = self.hidden_layer_3(x)
    x = self.bn3(x)
    x = F.relu(x)

    out = self.output_layer(x)
    return out

  def train_model(self, train_loader, val_loader=None, num_of_epochs=30, patience=5):
    self.train()

    train_losses = []
    val_losses = []
    val_accuracies = []

    best_loss = float("inf")
    epochs_no_improve = 0
    best_model_state = None

    for epoch in range(num_of_epochs):
      total_loss_for_epoch = 0

      for input_batch, target_label in train_loader:
        self.optimizer.zero_grad()

        pred_output = self(input_batch)
        loss = self.loss_function(pred_output, target_label)

        loss.backward()
        self.optimizer.step()

        total_loss_for_epoch += loss.item()

      average_loss = total_loss_for_epoch / len(train_loader)
      train_losses.append(average_loss)
      print(f"Epoch: {epoch + 1}/{num_of_epochs}, Loss: {average_loss:.4f}")

      if val_loader:
        val_loss, val_acc = self.evaluate_loss_and_accuracy(val_loader)
        val_losses.append(val_loss)
        val_accuracies.append(val_acc)

        print(f" | Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.2f}%", end='')

        if val_loss < best_loss:
          best_loss = val_loss
          best_model_state = copy.deepcopy(self.state_dict())
          torch.save(best_model_state, '../model/hamster_behavior_best_model.pt')
          # model_save_path = '/content/hamster_behavior_model_123.pt'
          # torch.save({
          #     "model_state_dict": copy.deepcopy(self.state_dict())
          # }, model_save_path)
          epochs_no_improve = 0
        else:
          epochs_no_improve += 1
          if epochs_no_improve >= patience:
            print("\n Early stopping triggered. Restoring best model...")
            self.load_state_dict(torch.load('../model/hamster_behavior_best_model.pt'))
            break
    self.plot_training_progress(train_losses, val_losses, val_accuracies)

  def eval_model(self, test_loader):
    self.eval()

    total_samples = 0
    correct_pred = 0

    with torch.no_grad():
      for input_batch, target_label in test_loader:
        pred_output = self(input_batch)
        _, predicted_labels = torch.max(pred_output, 1)

        total_samples += target_label.size(0)
        correct_pred += (predicted_labels == target_label).sum().item()

    accuracy = correct_pred / total_samples
    print(f"Accuracy: {accuracy * 100:.2f}%")

  def evaluate_loss_and_accuracy(self, loader):
    self.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
      for input_batch, target_label in loader:
        output = self(input_batch)
        loss = self.loss_function(output, target_label)
        total_loss += loss.item()

        _, preds = torch.max(output, 1)
        correct += (preds == target_label).sum().item()
        total += target_label.size(0)

    avg_loss = total_loss / len(loader)
    accuracy = 100.0 * correct / total
    return avg_loss, accuracy

  def plot_training_progress(self, train_losses, val_losses, val_accuracies):
    epochs = range(1, len(train_losses) + 1)

    plt.figure(figsize=(12, 5))

    # Loss plot
    plt.subplot(1, 2, 1)
    plt.plot(epochs, train_losses, label='Train Loss', marker='o')
    if val_losses:
        plt.plot(epochs, val_losses, label='Val Loss', marker='o')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Loss over Epochs')
    plt.legend()

    # Accuracy plot
    if val_accuracies:
        plt.subplot(1, 2, 2)
        plt.plot(epochs, val_accuracies, label='Val Accuracy', color='green', marker='o')
        plt.xlabel('Epoch')
        plt.ylabel('Accuracy (%)')
        plt.title('Validation Accuracy over Epochs')
        plt.legend()

    plt.tight_layout()
    plt.show()