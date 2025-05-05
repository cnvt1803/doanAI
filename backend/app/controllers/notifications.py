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


@router.put("/{user_id}/read_all", response_model=list[NotificationResponse])
def mark_all_as_read(user_id: int, db: Session = Depends(get_db)):
    return service.mark_all_as_read(db, user_id)


@router.get("/{user_id}/unread", response_model=list[NotificationResponse])
def get_unread_notifications(user_id: int, db: Session = Depends(get_db)):
    return service.get_unread_notifications(db, user_id)


@router.get("/{user_id}/unread/count")
def count_unread(user_id: int, db: Session = Depends(get_db)):
    return {"unread_count": service.count_unread_notifications(db, user_id)}
