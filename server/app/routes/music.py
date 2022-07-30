from app.routes.utils.determine_music_genre import determine_genre
from app.routes.utils.test import run, import_csv
from fastapi import APIRouter, UploadFile
from google.cloud import storage
import shutil
import boto3
import os
router = APIRouter(prefix="/api/music")


@router.post("/create")
async def create_music(audio: UploadFile):
#     [오디오 업로드]
#     로컬 환경 업로드(사용안함)
    with open(f"{os.path.join(os.path.dirname(__file__))}\data\input_audio\{audio.filename}", "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)



#     return True
#     os.environ["GOOGLE_APPLICATION_CREDENTIALS"]




#     storage_client = storage.Client()
#     buckets = list(storage_client.list_buckets())
#     print(buckets)
#
#     print("path >> ", os.path.dirname(__file__))
#     bucket_name = os.environ["GCP_BUCKET_NAME"]     # 서비스 계정 생성한 bucket 이름 입력
#     source_file_name = f"{os.path.join(os.path.dirname(__file__))}\data\input_audio\{audio.filename}"
# # GCP에 업로드할 파일 절대경로
#     destination_blob_name = audio.filename    # 업로드할 파일을 GCP에 저장할 때의 이름
#
#     print('source_file_name >> ', source_file_name)
#
#
#     storage_client = storage.Client()
#     bucket = storage_client.bucket(bucket_name)
#     blob = bucket.blob(destination_blob_name)
#
#     blob.upload_from_filename(source_file_name)






#     [장르 판별]
    genre = determine_genre(audio.filename)
    return {"success": True, "genre": genre}

#     [작곡 및 작사]


#     [목소리 매핑]

    return False


@router.get("/test")
def connect_state():
    print(run())
    print(import_csv())

    return {"/api/music": True}
