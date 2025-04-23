import requests
from datetime import datetime
from app.database import SessionLocal
from app.models.param_data import ParamData
import joblib
import os
from app.models.notifications import Notification
from app.schemas.notifications import NotificationCreate
from app.services.notifications import create_notification
from app.models.user import User

USERNAME = ""
KEY = ""
BASE_URL = f"https://io.adafruit.com/api/v2/{USERNAME}/feeds"
# FEED_ID = "bbc-temp"
THRESHOLD_MESSAGES = {
    1: "Nhiệt độ vượt ngưỡng!",
    2: "Độ ẩm vượt ngưỡng!",
    3: "Ánh sáng vượt ngưỡng!",
}
THRESHOLDS = {
    1: 26,      # Nhiệt độ (°C)
    2: 80,      # Độ ẩm (%)
    3: 2000     # Ánh sáng (lux)
}
FEEDS = {
    "temp": {"device_id": 1},
    "humid": {"device_id": 2},
    "light": {"device_id": 3},
    "sound": {"device_id": 4},
    "camera": {"device_id": 5}
}

def fetch_data(feed_id: str):
    url = f"{BASE_URL}/{feed_id}/data/last"
    headers = {"X-AIO-Key": KEY}
    response = requests.get(url=url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data.get("value")
    else:
        print(f"Error fetching {feed_id}: {response.text}")
        return None
def getData():
    db = SessionLocal()
    try:
        for feed, details in FEEDS.items():
            value = fetch_data(feed)
            if value is None:
                continue

            value = float(value)
            device_id = details["device_id"]

            # Lưu dữ liệu
            new_entry = ParamData(
                device_id=device_id,
                value=value,
                recorded_at=datetime.utcnow()
            )
            db.add(new_entry)
            db.commit()

            print(f"📝 Device {device_id}: {value}")

            # === Kiểm tra ngưỡng thủ công ===
            if device_id in THRESHOLDS and value > THRESHOLDS[device_id]:
                print(f"⚠️ Thiết bị {device_id} vượt ngưỡng: {value}")

                users = db.query(User).all()
                for user in users:
                    noti_data = NotificationCreate(
                        user_id=user.id,
                        message=THRESHOLD_MESSAGES.get(device_id, "Giá trị vượt ngưỡng!")
                    )
                    create_notification(db, noti_data)

            # === Kiểm tra bất thường bằng ML ===
            model_path = f"ml_models/model_device_{device_id}.pkl"
            if os.path.exists(model_path):
                model = joblib.load(model_path)
                prediction = model.predict([[value]])
                if prediction[0] == -1:  # bất thường
                    print(f"🚨 Cảnh báo ML thiết bị {device_id}: {value}")
                    
                    users = db.query(User).all()
                    for user in users:
                        noti_data = NotificationCreate(
                            user_id=user.id,
                            message=THRESHOLD_MESSAGES.get(device_id, "Giá trị vượt ngưỡng!")
                        )
                        create_notification(db, noti_data)

    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
    finally:
        db.close()



# def getData(feed_id: str):
#     url = f"{BASE_URL}/{feed_id}/data/last"
#     headers = {"X-AIO-Key": KEY}
    
#     response = requests.get(url=url, headers=headers)
    
#     if response.status_code == 200:
#         data = response.json()
#         if data:
#             # return data['value']
#             print(data['value'])
#         else:
#             # return {"error": "Don't have data"}
#             print({"error": "Don't have data"})
#     else:
#         # return {"error": response.text}
#         print({"error": response.text})

# def getData():
#     db = SessionLocal()
#     try:
#         for feed, details in FEEDS.items():
#             value = fetch_data(feed)
#             if value is not None:
#                 new_entry = ParamData(
#                     device_id=details["device_id"],
#                     value=value,
#                     recorded_at=datetime.utcnow()
#                 )
#                 db.add(new_entry)
#                 print(f"Added (Device {details['device_id']}): {value}")

#         db.commit()
#     except Exception as e:
#         print(f"Database error: {e}")
#         db.rollback()
#     finally:
#         db.close()
        
