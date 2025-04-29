from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.hamster_behavior import create_hamster_behavior, get_hamster_behaviors
from app.schemas.hamster_behavior import HamsterBehaviorCreate, HamsterBehaviorResponse

router = APIRouter(prefix="/hamster_behavior", tags=["Hamster Behavior"])

@router.post("/", response_model=HamsterBehaviorResponse)
def create_behavior(data: HamsterBehaviorCreate, db: Session = Depends(get_db)):
    return create_hamster_behavior(db, data)

@router.get("/", response_model=list[HamsterBehaviorResponse])
def get_all(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_hamster_behaviors(db, skip, limit)
