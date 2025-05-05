from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.device import Device


class ParamData(Base):
    __tablename__ = "param_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    device_id = Column(Integer, ForeignKey(
        "devices.id", ondelete="CASCADE"), nullable=False)
    value = Column(Float, nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    device = relationship("Device", back_populates="params", lazy="joined")
