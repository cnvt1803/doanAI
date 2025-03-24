from sqlalchemy.orm import Session
from app.models.device import Device, DeviceStatus, DeviceTypeEnum
from app.schemas.device import DeviceCreate
from datetime import datetime

def create_device(db: Session, device: DeviceCreate):
    if device.name not in {e.value for e in DeviceTypeEnum}:
        raise ValueError("Invalid type")
    
    if device.status not in {e.value for e in DeviceStatus}:
        raise ValueError("Invalid status")
    
    status = device.status if device.status else DeviceStatus.inactive
    
    new_device = Device(user_id=device.user_id, name=device.name, status=status)
    db.add(new_device)
    db.commit()
    db.refresh(new_device)
    return new_device

def get_devices(db: Session, user_id: int):
    return db.query(Device).filter(Device.user_id == user_id).all()

def get_device(db: Session, device_id: int):
    return db.query(Device).filter(Device.id == device_id).first()

def update_device(db: Session, device_id: int, device_data: DeviceCreate):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        return None
    
    if device_data.name not in {e.value for e in DeviceTypeEnum}:
        raise ValueError("Invalid type")
    
    if device_data.status not in {e.value for e in DeviceStatus}:
        raise ValueError("Invalid status")
    
    if device_data.name:
        device.name = device_data.name
    if device_data.status:
        device.status = device_data.status
    if device_data.user_id:
        device.user_id = device_data.user_id
    
    device.created_at = datetime.utcnow()

    db.commit()
    db.refresh(device)
    return device

def delete_device(db: Session, device_id: int):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device:
        db.delete(device)
        db.commit()
        return True
    return False