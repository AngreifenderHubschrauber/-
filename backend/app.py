from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List
import os
from PIL import Image

app = FastAPI()

# Папки для хранения файлов
UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Подключение статических файлов (для отдачи изображений)
app.mount("/static", StaticFiles(directory=PROCESSED_FOLDER), name="static")

# Загрузка изображений
@app.post("/upload/")
async def upload_images(files: List[UploadFile] = File(...)):
    uploaded_files = []
    for file in files:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        uploaded_files.append(file.filename)
    return {"message": "Files uploaded successfully", "files": uploaded_files}

# Анализ изображений
@app.post("/analyze/")
async def analyze_images():
    for filename in os.listdir(UPLOAD_FOLDER):
        input_path = os.path.join(UPLOAD_FOLDER, filename)
        output_path = os.path.join(PROCESSED_FOLDER, filename)

        try:
            img = Image.open(input_path)
            img = img.convert("L")
            img.save(output_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing {filename}: {str(e)}")
    return {"message": "Images processed successfully"}

# Получение списка обработанных изображений
@app.get("/processed/")
def get_processed_images():
    files = os.listdir(PROCESSED_FOLDER)
    return {"files": files}

# Скачивание изображений в полном размере
@app.get("/processed/{filename}")
def download_image(filename: str):
    file_path = os.path.join(PROCESSED_FOLDER, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)
