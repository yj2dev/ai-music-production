from app.routes.utils.determine_music_genre import determine_genre
from app.routes.utils.write_lyrics import write_lyrics
from app.routes.utils.composition import composition
from app.routes.utils.test import run, import_csv
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse
from google.cloud import storage
from base64 import b64encode
import shutil
import boto3
import os
router = APIRouter(prefix="/api/music")


@router.post("/create")
async def create_music(audio: UploadFile):

###     [오디오 업로드] - 로컬 업로드
    with open(f"{os.path.join(os.path.dirname(__file__))}\data\input_audio\{audio.filename}", "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

###     [장르 판별]
    genre = determine_genre(audio.filename)

###     [작사]
    lyric = write_lyrics(genre)

###     [작곡]
    is_created = composition("Hiphop")
    print('is_created >> ', is_created)

    if not is_created: return { 'success': False }


    composition_path = "app/routes/data/output_audio/output_Hiphop_1661239846.mid"


    with open(composition_path, mode="rb") as file_like:
        file_content = b64encode(file_like.read())
    base64_file = file_content.decode('utf-8')



    # print('result >> ', result)
    # return result

    return {"success": True,
            'base64_file': base64_file,
            "genre": genre,
            "lyric": lyric }



###     [작사 작곡 병합] (개발계획없음)
###     [목소리 매핑] (개발계획없음)





@router.get("/test")
def connect_state():
    return write_lyrics("발라드")
    # return {"/api/music": True}
