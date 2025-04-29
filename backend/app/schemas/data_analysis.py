from pydantic import BaseModel
from datetime import datetime

class DataAnalysisBase(BaseModel):
    device_id: int
    prediction: str

class DataAnalysisCreate(DataAnalysisBase):
    pass

class DataAnalysisResponse(DataAnalysisBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
