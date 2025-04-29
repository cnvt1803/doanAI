from sqlalchemy.orm import Session
from app.models.hamster_count import HamsterCount
from app.schemas.hamster_count import HamsterCountCreate

def create_hamster_count(db: Session, data: HamsterCountCreate):
    new_hamster_count = HamsterCount(device_id=data.device_id, has_stranger=data.has_stranger, count=data.count)
    db.add(new_hamster_count)
    db.commit()
    db.refresh(new_hamster_count)
    return new_hamster_count

def get_hamster_counts(db: Session, device_id: int, skip: int = 0, limit: int = 10):
    return db.query(HamsterCount).filter(HamsterCount.device_id == device_id).offset(skip).limit(limit).all()

def update_hamster_count(db: Session, hamster_count_id: int, data: HamsterCountCreate):
    db_hamster_count = db.query(HamsterCount).filter(HamsterCount.id == hamster_count_id).first()
    if not db_hamster_count:
        return None
    for key, value in data.dict().items():
        setattr(db_hamster_count, key, value)
    db.commit()
    db.refresh(db_hamster_count)
    return db_hamster_count

def delete_hamster_count(db: Session, hamster_count_id: int):
    db_hamster_count = db.query(HamsterCount).filter(HamsterCount.id == hamster_count_id).first()
    if not db_hamster_count:
        return None
    db.delete(db_hamster_count)
    db.commit()
    return db_hamster_count
