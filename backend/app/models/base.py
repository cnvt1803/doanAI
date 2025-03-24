from app.database import Base

from app.models.user import User
from app.models.device import Device
from app.models.param_data import ParamData

# Base.metadata.create_all(bind=engine)