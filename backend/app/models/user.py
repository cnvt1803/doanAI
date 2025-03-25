from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    devices = relationship("Device", back_populates="owner", cascade="all, delete", lazy="joined")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete", lazy="joined")
