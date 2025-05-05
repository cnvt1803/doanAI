import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from ultralytics import YOLO

UPLOAD_DIR = "uploads"
RESULT_DIR = "results"
MODEL_PATH = "./app/AI/yolov8/best.pt"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

model = YOLO(MODEL_PATH)


def detect_hamster(image_path: str) -> dict:
    # Đảm bảo đuôi hợp lệ, nếu không thì convert sang .jpg
    valid_exts = {".jpeg", ".jpg", ".png", ".bmp", ".webp"}
    ext = Path(image_path).suffix.lower()

    if ext not in valid_exts:
        image = Image.open(image_path)
        # tạo path mới với .jpg đuôi đúng
        image_path = os.path.splitext(image_path)[0] + ".jpg"
        image.convert("RGB").save(image_path, "JPEG")

    results = model(image_path)
    output_image_path = os.path.join(RESULT_DIR, os.path.basename(image_path))
    hamster_count = 0

    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]
            if class_name.lower() == "hamster":
                hamster_count += 1

        # Vẽ kết quả
        im_array = r.plot()
        im = Image.fromarray(im_array[..., ::-1])
        draw = ImageDraw.Draw(im)

        try:
            font = ImageFont.truetype("arial.ttf", 30)
        except:
            font = ImageFont.load_default()

        draw.text((10, 10), f"Hamster Count: {hamster_count}", fill=(
            255, 0, 0), font=font)
        im.save(output_image_path)

    return {
        "count": hamster_count,
        "output_image": output_image_path
    }
