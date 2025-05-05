from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from fastapi import HTTPException


def create_user(db: Session, user: UserCreate):
    new_user = User(username=user.username,
                    email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, user_data: UserCreate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    user.username = user_data.username
    user.email = user_data.email
    user.password = user_data.password

    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return True
    return False


def login_user(db: Session, user_data: UserLogin):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user or user.password != user_data.password:
        raise HTTPException(
            status_code=401, detail="Email hoặc mật khẩu không đúng")

    return {
        "message": "Đăng nhập thành công",
        "user_id": user.id,
        "username": user.username
    }
