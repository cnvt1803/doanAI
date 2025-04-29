import requests
from datetime import datetime
from app.database import SessionLocal
from app.models.param_data import ParamData

USERNAME = ""
KEY
BASE_URL = f"https://io.adafruit.com/api/v2/{USERNAME}/feeds"
# FEED_ID = "bbc-temp"

FEEDS = {
    "temp": {"device_id": 5},
    "humid": {"device_id": 7},
    "light": {"device_id": 8},
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
