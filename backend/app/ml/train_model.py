import pandas as pd
import os
import joblib
from sklearn.ensemble import IsolationForest

# Tạo thư mục lưu model
os.makedirs("ml_models", exist_ok=True)

# Đọc dữ liệu từ file CSV
csv_file = "hamster_behavior_synthetic-2.csv"
df = pd.read_csv(csv_file)

# Đổi tên cột để dễ xử lý
df.rename(columns={
    "Temperature(C)": "temperature",
    "Humidity(%)": "humidity",
    "Light(lux)": "light"
}, inplace=True)

# Danh sách thiết bị tương ứng với mô hình và cột
DEVICE_MAP = {
    1: "temperature",
    2: "humidity",
    3: "light"
}

# Huấn luyện mô hình Isolation Forest cho từng loại dữ liệu
for device_id, column_name in DEVICE_MAP.items():
    subset = df[[column_name]].dropna()
    if len(subset) < 10:
        print(f"Không đủ dữ liệu cho thiết bị {device_id} ({column_name})")
        continue

    model = IsolationForest(contamination=0.05, random_state=42)
    model.fit(subset)

    model_path = f"ml_models/model_device_{device_id}.pkl"
    joblib.dump(model, model_path)
    print(f"✅ Đã huấn luyện model cho thiết bị {device_id} ({column_name}) và lưu tại {model_path}")
