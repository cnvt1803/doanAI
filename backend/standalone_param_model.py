from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ParamData(Base):
    __tablename__ = "param_data"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer)
    value = Column(Float)
    recorded_at = Column(DateTime)
