import os
import joblib
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.feature import hog

classes = ['eating', 'sleeping', 'activing']


def extract_hog_features(image_path):
    image = Image.open(image_path).convert('L').resize((128, 128))
    image_np = np.array(image)
    features, _ = hog(image_np,
                      orientations=9,
                      pixels_per_cell=(8, 8),
                      cells_per_block=(2, 2),
                      block_norm='L2-Hys',
                      visualize=True)
    return features


def predict_image(image_path):
    feat = extract_hog_features(image_path)
    Knn = joblib.load('app/AI/behavior/knn_model.pkl')
    prediction = Knn.predict([feat])[0]
    predicted_label = classes[prediction]

    # Tạo thư mục solution nếu chưa có
    os.makedirs("solution", exist_ok=True)

    # Tạo tên file đích và lưu ảnh vào thư mục solution
    filename = os.path.basename(image_path)
    save_path = os.path.join("solution", filename)

    # Mở ảnh gốc và vẽ nhãn dự đoán lên ảnh
    image = Image.open(image_path).convert('RGB')
    draw = ImageDraw.Draw(image)

    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()

    draw.text((10, 10), f"Dự đoán: {predicted_label}", fill="red", font=font)
    image.save(save_path)

    return predicted_label
