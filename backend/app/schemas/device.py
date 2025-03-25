from pydantic import BaseModel
from datetime import datetime
import enum
from typing import Optional

class DeviceTypeEnum(str, enum.Enum):
    temperature = "temperature_type"
    humidity = "humidity_type"
    light = "light_type"
    sound = "sound_type"
    camera = "camera_type"

class DeviceStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    error = "error"

class DeviceBase(BaseModel):
    name: DeviceTypeEnum
    status: DeviceStatus = DeviceStatus.inactive
    
class DeviceUpdate(BaseModel):
    name: Optional[DeviceTypeEnum] = None
    status: Optional[DeviceStatus] = None
    user_id: Optional[int] = None

class DeviceCreate(DeviceBase):
    user_id: int

class DeviceResponse(DeviceBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
