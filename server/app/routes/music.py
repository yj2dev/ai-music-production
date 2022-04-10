from fastapi import APIRouter, UploadFile

router = APIRouter(prefix="/api/music")

@router.get("/create")
async def create_music(audio: UploadFile):
    content = await audio.read()
    print('audio name >> ', audio.filename)
    print('content size >> ', len(content))


@router.get("/test")
def connect_state():
    return {"/api/music": True}

