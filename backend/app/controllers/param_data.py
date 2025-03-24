from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.param_data import create_param_data, get_param_data_by_device, get_device_info
from app.schemas.param_data import ParamDataCreate, ParamDataResponse
from app.schemas.device import DeviceResponse

router = APIRouter(prefix="/param_data", tags=["Param Data"])

@router.post("/", response_model=ParamDataResponse)
def add_param_data(param_data: ParamDataCreate, db: Session = Depends(get_db)):
    return create_param_data(db, param_data)

@router.get("/{device_id}", response_model=list[ParamDataResponse])
def fetch_params_by_device(device_id: int, db: Session = Depends(get_db)):
    params = get_param_data_by_device(db, device_id)
    if not params:
        raise HTTPException(status_code=404, detail="No data found for this device")
    return params

@router.get("/device_info/{device_id}", response_model=DeviceResponse)
def fetch_device_info(device_id: int, db: Session = Depends(get_db)):
    device = get_device_info(db, device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device
