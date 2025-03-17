from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import data_analysis as service
from app.schemas.data_analysis import DataAnalysisCreate, DataAnalysisResponse

router = APIRouter(prefix="/data_analysis", tags=["Data Analysis"])

@router.post("/", response_model=DataAnalysisResponse)
def create_data(data: DataAnalysisCreate, db: Session = Depends(get_db)):
    return service.create_data_analysis(db, data)

@router.get("/", response_model=list[DataAnalysisResponse])
def get_all(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_data_analysis(db, skip, limit)
