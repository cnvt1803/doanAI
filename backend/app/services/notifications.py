from sqlalchemy.orm import Session
from app.models.notifications import Notification
from app.schemas.notifications import NotificationCreate


def create_notification(db: Session, notic: NotificationCreate):
    new_notification = Notification(
        user_id=notic.user_id, message=notic.message)
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification


def get_notifications(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(Notification).filter(Notification.user_id == user_id).offset(skip).limit(limit).all()


def mark_as_read(db: Session, notification_id: int):
    notification = db.query(Notification).filter(
        Notification.id == notification_id).first()
    if notification:
        notification.is_read = True
        db.commit()
        db.refresh(notification)
    return notification


def mark_all_as_read(db: Session, user_id: int):
    notifications = db.query(Notification).filter(
        Notification.user_id == user_id, Notification.is_read == False).all()
    for notification in notifications:
        notification.is_read = True
    db.commit()
    return notifications


def get_unread_notifications(db: Session, user_id: int):
    return db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).order_by(Notification.created_at.desc()).all()


def count_unread_notifications(db: Session, user_id: int):
    return db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).count()
