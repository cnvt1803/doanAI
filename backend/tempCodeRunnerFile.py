from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from standalone_param_model import ParamData, Base  # Sử dụng file mới
import matplotlib.pyplot as plt

DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "db_DADN"
DB_USER = "user_DADN"
DB_PASS = "123456789"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

try:
    # Lấy 30 bản ghi gần nhất của device_id = 5
    raw_data = session.query(ParamData)\
        .filter(ParamData.device_id == 5)\
        .order_by(ParamData.recorded_at.desc())\
        .limit(30)\
        .all()

    # Lấy cách 3 dòng 1 lần, giới hạn 10 giá trị
    filtered_data = raw_data[::3][:10]
    filtered_data.reverse()  # Đảo ngược để vẽ theo thứ tự thời gian

    if not filtered_data:
        print("Không có dữ liệu để vẽ.")
    else:
        times = [d.recorded_at.strftime("%H:%M:%S") for d in filtered_data]
        values = [d.value for d in filtered_data]

        # Vẽ biểu đồ
        plt.figure(figsize=(10, 5))
        plt.plot(times, values, marker='o', linestyle='-', color='blue')
        plt.title("Nhiệt độ theo thời gian ")
        plt.xlabel("Thời gian (HH:MM:SS)")
        plt.ylabel("Nhiệt độ (°C)")
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

except Exception as e:
    print("Lỗi khi truy vấn hoặc vẽ dữ liệu:", e)
finally:
    session.close()
