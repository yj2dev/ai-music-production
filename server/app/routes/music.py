from app.routes.utils.determine_music_genre import set_genre
from app.routes.utils.test import run, import_csv
from fastapi import APIRouter, UploadFile
import shutil
import os

router = APIRouter(prefix="/api/music")

@router.post("/create")
async def create_music(audio: UploadFile):
    # 오디오 업로드
    #     with open(f"app/data/input_voice/{audio.filename}", "wb") as buffer:
    with open(f"{os.path.join(os.path.dirname(__file__))}{audio.filename}", "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    # 장르 판별




    # 작곡 및 작사

    # 목소리 매핑

    return True


@router.get("/test")
def connect_state():
    print(run())
    print(import_csv())

    return {"/api/music": True}
