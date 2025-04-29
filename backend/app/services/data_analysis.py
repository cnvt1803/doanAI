from sqlalchemy.orm import Session
from app.models.data_analysis import DataAnalysis
from app.schemas.data_analysis import DataAnalysisCreate

def create_data_analysis(db: Session, data: DataAnalysisCreate):
    db_data = DataAnalysis(device_id=data.device_id, prediction=data.prediction)
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

def get_data_analysis(db: Session, skip: int = 0, limit: int = 10):
    return db.query(DataAnalysis).offset(skip).limit(limit).all()
