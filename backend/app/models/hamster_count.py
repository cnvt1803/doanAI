from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
import datetime
from app.database import Base

class HamsterCount(Base):
    __tablename__ = "hamster_count"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    device_id = Column(Integer, ForeignKey("devices.id"), nullable=False)
    has_stranger = Column(Boolean, nullable=False, default=False)
    count = Column(Integer, nullable=False, default=0)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

    device = relationship("Device", back_populates="hamster_counts", lazy="joined")
