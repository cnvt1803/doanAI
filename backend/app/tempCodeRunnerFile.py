from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from matplotlib import pyplot as plt
from app.models import ParamData  # sửa đúng đường dẫn nếu khác
from app.database import Base  # base model của bạn

# Kết nối PostgreSQL
DATABASE_URL = f"postgresql://{settings.DB_USER}:{settings.DB_PASS}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Tạo session
session = SessionLocal()

# Truy vấn 10 bản ghi gần nhất của thiết bị có device_id = 5
data = (
    session.query(ParamData)
    .filter(ParamData.device_id == 5)
    .order_by(ParamData.recorded_at.desc())
    .limit(10)
    .all()
)

# Đảo ngược để hiển thị theo thời gian tăng dần
data = list(reversed(data))

# Lấy giá trị và thời gian
values = [d.value for d in data]
timestamps = [d.recorded_at.strftime('%Y-%m-%d %H:%M:%S') for d in data]

# Vẽ biểu đồ
plt.figure(figsize=(10, 5))
plt.plot(timestamps, values, marker='o', linestyle='-', color='blue')
plt.title("10 giá trị Temperature gần nhất (device_id = 5)")
plt.xlabel("Thời gian")
plt.ylabel("Giá trị")
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()
