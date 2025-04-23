import pandas as pd
import joblib
import os

# Đường dẫn đến mô hình và dữ liệu
model_paths = {
    "temperature": "ml_models/model_device_1.pkl",
    "humidity": "ml_models/model_device_2.pkl",
    "light": "ml_models/model_device_3.pkl"
}
csv_path = "hamster_behavior_synthetic-2.csv"

# Đọc dữ liệu CSV
df = pd.read_csv(csv_path)
df.rename(columns={
    "Temperature(C)": "temperature",
    "Humidity(%)": "humidity",
    "Light(lux)": "light"
}, inplace=True)

# Load các model
models = {}
for key, path in model_paths.items():
    if os.path.exists(path):
        models[key] = joblib.load(path)
    else:
        print(f"⚠️ Không tìm thấy model: {path}")

# Dự đoán bất thường
for key, model in models.items():
    df[f"{key}_anomaly"] = model.predict(df[[key]])

# In ra các dòng bất thường
anomalies = df[
    (df["temperature_anomaly"] == -1) |
    (df["humidity_anomaly"] == -1) |
    (df["light_anomaly"] == -1)
]

print("📊 Các dòng bất thường được phát hiện:")
print(anomalies[["Time", "temperature", "humidity", "light", 
                "temperature_anomaly", "humidity_anomaly", "light_anomaly"]])
