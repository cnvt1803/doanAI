import requests
from datetime import datetime, timedelta, timezone
from app.database import SessionLocal
from app.models.param_data import ParamData
import csv
from math import floor
from sqlalchemy import desc
from pathlib import Path

USERNAME = ""
KEY = ""
BASE_URL = f"https://io.adafruit.com/api/v2/{USERNAME}/feeds"
# FEED_ID = "bbc-temp"

FEEDS = {
    "temp": {"device_id": 1},
    "humid": {"device_id": 2},
    "light": {"device_id": 3},
    # "sound": {"device_id": 4},
    # "camera": {"device_id": 5}
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

def getData():
    db = SessionLocal()
    try:
        for feed, details in FEEDS.items():
            value = fetch_data(feed)
            if value is not None:
                new_entry = ParamData(
                    device_id=details["device_id"],
                    value=value,
                    recorded_at=datetime.utcnow()
                )
                db.add(new_entry)
                print(f"Added (Device {details['device_id']}): {value}")

        db.commit()
    except Exception as e:
        print(f"Database error: {e}")
        db.rollback()
    finally:
        db.close()
        

def export_to_csv():
    db = SessionLocal()
    try:
        records = []
        for device_id in [1, 2, 3]:
            data = db.query(ParamData).filter(ParamData.device_id == device_id)\
                    .order_by(desc(ParamData.id)).first()
            if data:
                records.append(data)
            else:
                print(f"No data for device {device_id}")

        if len(records) == 3:
            # times = [data.recorded_at for data in records]
            # avg_time = datetime.utcfromtimestamp(
            #     sum([t.timestamp() for t in times]) // 3
            # )
            VN_TZ = timezone(timedelta(hours=7))

            times = [data.recorded_at.astimezone(VN_TZ) for data in records]
            avg_timestamp = sum([t.timestamp() for t in times]) // len(times)
            avg_time = datetime.fromtimestamp(avg_timestamp, VN_TZ)

            row = {
                "Hour": floor(avg_time.hour),
                "Minute": floor(avg_time.minute),
                "Second": floor(avg_time.second),
                "Temperature(C)": records[0].value,
                "Humidity(%)": records[1].value,
                "Light(lux)": records[2].value,
                "Behavior": "abcde"
            }

            csv_path = Path(__file__).resolve().parent.parent / "AI" / "data" / "hamster_behavior.csv"
            csv_path.parent.mkdir(parents=True, exist_ok=True)

            file_exists = csv_path.exists()

            with open(csv_path, mode="a", newline="") as csvfile:
                fieldnames = ["Hour", "Minute", "Second", "Temperature(C)", "Humidity(%)", "Light(lux)", "Behavior"]
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                if not file_exists:
                    writer.writeheader()

                writer.writerow(row)

            print(f"Data exported to {csv_path}")
        else:
            print("Not enough data to export")

    except Exception as e:
        print(f"Export error: {e}")
    finally:
        db.close()