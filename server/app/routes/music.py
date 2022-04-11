from fastapi import APIRouter, UploadFile

router = APIRouter(prefix="/api/music")


@router.get("/create")
async def create_music(audio: UploadFile):
    content = await audio.read()

    # 장르 판별

    # 작곡 및 작사

    # 목소리 매핑

    print('audio name >> ', audio.filename)
    print('content size >> ', len(content))
    return True


@router.get("/test")
def connect_state():
    return {"/api/music": True}
