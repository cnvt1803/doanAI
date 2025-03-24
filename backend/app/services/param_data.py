from sqlalchemy.orm import Session
from app.models.param_data import ParamData
from app.models.device import Device
from app.schemas.param_data import ParamDataCreate

def create_param_data(db: Session, param_data: ParamDataCreate):
    new_param = ParamData(device_id=param_data.device_id, value=param_data.value)
    db.add(new_param)
    db.commit()
    db.refresh(new_param)
    return new_param

def get_param_data_by_device(db: Session, device_id: int):
    return db.query(ParamData).filter(ParamData.device_id == device_id).all()

def get_device_info(db: Session, device_id: int):
    return db.query(Device).filter(Device.id == device_id).first()
