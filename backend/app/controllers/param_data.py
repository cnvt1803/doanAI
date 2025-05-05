from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.param_data import create_param_data, get_param_data_by_device, get_device_info, get_latest_param_data
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
        raise HTTPException(
            status_code=404, detail="No data found for this device")
    return params


@router.get("/device_info/{device_id}", response_model=DeviceResponse)
def fetch_device_info(device_id: int, db: Session = Depends(get_db)):
    device = get_device_info(db, device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.get("/device/{device_id}/latest", response_model=ParamDataResponse)
def fetch_latest_param_data(device_id: int, db: Session = Depends(get_db)):
    latest_param = get_latest_param_data(db=db, device_id=device_id)
    if not latest_param:
        raise HTTPException(
            status_code=404, detail="No data found for this device")
    return latest_param


@router.get("/device/{device_id}/latest-list")
def fetch_latest_param_data_list(device_id: int, db: Session = Depends(get_db)):
    from app.services.param_data import get_latest_param_data_list  # thêm nếu chưa import

    data_list = get_latest_param_data_list(
        db=db, device_id=device_id, limit=10)
    if not data_list:
        raise HTTPException(
            status_code=404, detail="No data found for this device")

    # Trả về danh sách giá trị đơn giản (hoặc đổi response_model nếu cần schema)
    return {
        # đảo ngược: cũ nhất → mới nhất
        "values": [item.value for item in reversed(data_list)],
        "timestamps": [item.recorded_at for item in reversed(data_list)]
    }
