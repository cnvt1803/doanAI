from app.database import Base, engine

from app.models.user import User
from app.models.device import Device
from app.models.param_data import ParamData
from app.models.data_analysis import DataAnalysis
from app.models.hamster_behavior import HamsterBehavior
from app.models.notifications import Notification
from app.models.hamster_count import HamsterCount

Base.metadata.create_all(bind=engine)