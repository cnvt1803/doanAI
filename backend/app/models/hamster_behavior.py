from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class HamsterBehavior(Base):
    __tablename__ = "hamster_behavior"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    device_id = Column(Integer, ForeignKey("devices.id"), nullable=False)
    activity = Column(String, nullable=False)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

    device = relationship("Device", back_populates="hamster_behaviors", lazy="joined")
