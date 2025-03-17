from datetime import datetime
from pydantic import BaseModel

class ParamDataBase(BaseModel):
    device_id: int
    value: float

class ParamDataCreate(ParamDataBase):
    pass

class ParamDataResponse(ParamDataBase):
    id: int
    recorded_at: datetime

    class Config:
        from_attributes = True
