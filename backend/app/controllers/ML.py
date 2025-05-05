from fastapi import APIRouter, HTTPException
from app.services.ML import predict_behavior
from pydantic import BaseModel

router = APIRouter(prefix="/ml", tags=["ML Prediction"])

class PredictRequest(BaseModel):
    hour: int
    minute: int
    second: int
    temperature: float
    humidity: float
    light: float
    
class PredictResponse(BaseModel):
    behavior: str

@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        data = [req.hour, req.minute, req.second, req.temperature, req.humidity, req.light]
        result = predict_behavior(data)
        return PredictResponse(behavior=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))