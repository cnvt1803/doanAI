from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import notifications as service
from app.schemas.notifications import NotificationCreate, NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/", response_model=NotificationResponse)
def create_notification(data: NotificationCreate, db: Session = Depends(get_db)):
    return service.create_notification(db, data)

@router.get("/{user_id}", response_model=list[NotificationResponse])
def get_all(user_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_notifications(db, user_id, skip, limit)

@router.put("/{notification_id}/read", response_model=NotificationResponse)
def mark_as_read(notification_id: int, db: Session = Depends(get_db)):
    return service.mark_as_read(db, notification_id)
