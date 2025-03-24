from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.device import create_device, get_devices, get_device, delete_device, update_device
from app.schemas.device import DeviceCreate, DeviceResponse, DeviceUpdate

router = APIRouter(prefix="/devices", tags=["Devices"])

@router.post("/", response_model=DeviceResponse)
def create_new_device(device: DeviceCreate, db: Session = Depends(get_db)):
    try:
        return create_device(db, device)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{user_id}", response_model=list[DeviceResponse])
def list_devices_with_user_id(user_id: int, db: Session = Depends(get_db)):
    return get_devices(db, user_id)

@router.get("/detail/{device_id}", response_model=DeviceResponse)
def retrieve_device(device_id: int, db: Session = Depends(get_db)):
    return get_device(db, device_id)

@router.put("/{device_id}", response_model=DeviceResponse)
def update_existing_device(device_id: int, device: DeviceUpdate, db: Session = Depends(get_db)):
    try:
        updated_device = update_device(db, device_id, device)
        if updated_device is None:
            raise HTTPException(status_code=404, detail="Device not found")
        return updated_device
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{device_id}")
def remove_device(device_id: int, db: Session = Depends(get_db)):
    if not delete_device(db, device_id):
        raise HTTPException(status_code=404, detail="Device not found")
    return {"message": "Device deleted"}