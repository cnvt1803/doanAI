from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import enum

class DeviceTypeEnum(str, enum.Enum):
    temperature = "temperature_type"
    humidity = "humidity_type"
    light = "light_type"
    sound = "sound_type"

class DeviceStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    error = "error"

class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(Enum(DeviceTypeEnum), nullable=False)
    status = Column(Enum(DeviceStatus), default=DeviceStatus.inactive, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="devices", lazy="joined")
    params = relationship("ParamData", back_populates="device", cascade="all, delete", lazy="joined")
    data_analysis = relationship("DataAnalysis", back_populates="device", cascade="all, delete", lazy="joined")
