from fastapi import FastAPI, File, UploadFile
from fastapi import APIRouter, HTTPException, Form
import uuid
import os
from io import BytesIO
import shutil
from app.services.behavior_detect import predict_image

router = APIRouter(prefix="/detect", tags=["Detection"])


@router.post("/predict/")
async def predict_activity(file: UploadFile = File(...)):
    temp_name = f"{uuid.uuid4().hex}_{file.filename}"
    temp_path = f"./uploads/{temp_name}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    activity = predict_image(temp_path)

    os.remove(temp_path)

    return {"activity": activity}
