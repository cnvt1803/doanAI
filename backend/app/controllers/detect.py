import shutil
import uuid
import base64
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from app.services.detect import detect_hamster

router = APIRouter(prefix="/detect", tags=["Detection"])


@router.post("/image-file")
async def detect_and_return_file(file: UploadFile = File(...)):
    temp_name = f"{uuid.uuid4().hex}{file.filename[-4:]}"
    temp_path = f"./uploads/{temp_name}"

    with open(temp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = detect_hamster(temp_path)
    return FileResponse(result["output_image"], media_type="image/jpeg")


@router.post("/count_hamster")
async def detect_and_return_base64(file: UploadFile = File(...)):
    temp_name = f"{uuid.uuid4().hex}{file.filename[-4:]}"
    temp_path = f"./uploads/{temp_name}"

    with open(temp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = detect_hamster(temp_path)

    return {
        "hamster_count": result["count"]
    }
