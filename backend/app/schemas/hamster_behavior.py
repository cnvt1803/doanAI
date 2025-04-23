from pydantic import BaseModel
from datetime import datetime

class HamsterBehaviorBase(BaseModel):
    device_id: int
    activity: str

class HamsterBehaviorCreate(HamsterBehaviorBase):
    pass

class HamsterBehaviorResponse(HamsterBehaviorBase):
    id: int
    recorded_at: datetime

    class Config:
        from_attributes = True
