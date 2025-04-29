from pydantic import BaseModel
from datetime import datetime

class HamsterCountBase(BaseModel):
    device_id: int
    has_stranger: bool
    count: int

class HamsterCountCreate(HamsterCountBase):
    pass

class HamsterCountResponse(HamsterCountBase):
    id: int
    recorded_at: datetime

    class Config:
        from_attributes = True
