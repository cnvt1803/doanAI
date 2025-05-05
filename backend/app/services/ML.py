import torch
import joblib
from app.AI.src.neural_network import NeuralNetwork
from app.AI.src.utils import preprocess_single_sample_with_time

scaler = joblib.load("app/AI/src/scaler/scaler.save")

model = NeuralNetwork(num_of_features=6, num_of_output_classes=3)
checkpoint = torch.load("app/AI/model/hamster_behavior_model.pt")
model.load_state_dict(checkpoint["model_state_dict"])
model.eval()

label_mapping = {0: "active", 1: "eating", 2: "sleeping"}

def predict_behavior(data: list[float]) -> str:
    #   data: [hour, minute, second, temperature, humidity, light]
    try:
        new_data  = {
            "Hour": data[0],
            "Minute": data[1],
            "Second": data[2],
            "Temperature": data[3],
            "Humidity": data[4],
            "Light": data[5]
        }

        input_tensor = preprocess_single_sample_with_time(new_data, scaler)

        with torch.no_grad():
            output = model(input_tensor)
            predicted_class = torch.argmax(output, dim=1).item()

        return label_mapping[predicted_class]
    except Exception as e:
        raise RuntimeError(f"Prediction error: {e}")