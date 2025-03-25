from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import hamster_count as service
from app.schemas.hamster_count import HamsterCountCreate, HamsterCountResponse

router = APIRouter(prefix="/hamster_count", tags=["Hamster Count"])

@router.post("/", response_model=HamsterCountResponse)
def create_hamster_count(data: HamsterCountCreate, db: Session = Depends(get_db)):
    return service.create_hamster_count(db, data)

@router.get("/{device_id}", response_model=list[HamsterCountResponse])
def get_all(device_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_hamster_counts(db, device_id, skip, limit)

@router.put("/{hamster_count_id}", response_model=HamsterCountResponse)
def update(hamster_count_id: int, data: HamsterCountCreate, db: Session = Depends(get_db)):
    updated_hamster_count = service.update_hamster_count(db, hamster_count_id, data)
    if not updated_hamster_count:
        raise HTTPException(status_code=404, detail="Hamster count not found")
    return updated_hamster_count

@router.delete("/{hamster_count_id}", response_model=HamsterCountResponse)
def delete(hamster_count_id: int, db: Session = Depends(get_db)):
    deleted_hamster_count = service.delete_hamster_count(db, hamster_count_id)
    if not deleted_hamster_count:
        raise HTTPException(status_code=404, detail="Hamster count not found")
    return deleted_hamster_count