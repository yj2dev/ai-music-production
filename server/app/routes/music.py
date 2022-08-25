from app.routes.utils.determine_music_genre import determine_genre
from app.routes.utils.write_lyrics import write_lyrics
from app.routes.utils.composition import composition
from app.routes.utils.test import run, import_csv
from fastapi import APIRouter, UploadFile
from fastapi.responses import StreamingResponse
from google.cloud import storage
import shutil
import boto3
import os
router = APIRouter(prefix="/api/music")


@router.post("/create")
async def create_music(audio: UploadFile):

###     [오디오 업로드] - 로컬 업로드
#     with open(f"{os.path.join(os.path.dirname(__file__))}\data\input_audio\{audio.filename}", "wb") as buffer:
#         shutil.copyfileobj(audio.file, buffer)

###     [장르 판별]
#     genre = determine_genre(audio.filename)

###     [작사]
#     lyric = write_lyrics(genre)

###     [작곡]
    is_created = composition("Hiphop")
    print('is_created >> ', is_created)

    composition_path = "app/routes/data/output_audio/output_Hiphop_1661240150.mid"
    def iterfile():  #
        with open(composition_path, mode="rb") as file_like:  #
            yield from file_like

    if not is_created: return False

    return StreamingResponse(iterfile(), media_type="audio/midi")


    # print('result >> ', result)
    # return result

    # return {"success": True, "genre": genre, "lyric": lyric}



###     [작사 작곡 병합] (개발계획없음)
###     [목소리 매핑] (개발계획없음)





@router.get("/test")
def connect_state():
    return write_lyrics("발라드")
    # return {"/api/music": True}
