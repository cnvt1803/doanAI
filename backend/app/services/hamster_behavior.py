from sqlalchemy.orm import Session
from app.models.hamster_behavior import HamsterBehavior
from app.schemas.hamster_behavior import HamsterBehaviorCreate

def create_hamster_behavior(db: Session, behavior: HamsterBehaviorCreate):
    new_behavior = HamsterBehavior(device_id=behavior.device_id, activity=behavior.activity)
    db.add(new_behavior)
    db.commit()
    db.refresh(new_behavior)
    return new_behavior

def get_hamster_behaviors(db: Session, skip: int = 0, limit: int = 10):
    return db.query(HamsterBehavior).offset(skip).limit(limit).all()
