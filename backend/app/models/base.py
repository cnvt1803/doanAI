from app.database import Base, engine

from app.models.user import User
from app.models.device import Device
from app.models.param_data import ParamData
from app.models.data_analysis import DataAnalysis

Base.metadata.create_all(bind=engine)