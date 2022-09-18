from app.utils.determine_music_genre import determine_genre
from app.utils.write_lyrics import write_lyrics
from app.utils.composition.composition import composition
from fastapi import APIRouter, UploadFile
from base64 import b64encode
import shutil
import time
router = APIRouter(prefix="/api/music")

@router.get("/create/{genre}")
async def create_music(genre=None, keyword=None):
    total_start = time.time()
    print('[LOG] 선택된 장르 또는 키워드 (',genre, keyword, ')')

### [작사]
    section3_start = time.time()
    lyric = write_lyrics(genre, keyword)
    print('[LOG] 작사 완료 (',lyric[0:13],'...)')
    section3_time = time.time() - section3_start

### [작곡]
    section4_start = time.time()
    composition_path = composition(genre)
    if not composition_path: return { 'success': False }
    with open(composition_path, mode="rb") as file_like:
        file_content = b64encode(file_like.read())
    base64_file = file_content.decode('utf-8')
    section4_time = time.time() - section4_start
    print('[LOG] 작곡 완료 (',base64_file[0:10],')')

    print(f'[LOG] 작사 소요시간: {section3_time:.1f}')
    print(f'[LOG] 작곡 소요시간: {section4_time:.1f}')
    print(f'[LOG] 총 소요시간: {(time.time() - total_start):.1f}')

    return {
        "success": True,
        'base64_file': base64_file,
        "genre": genre,
        "lyric": lyric
        }

@router.post("/create")
async def create_music(audio: UploadFile):
    total_start = time.time()

### [오디오 업로드] - 로컬 업로드
    section1_start = time.time()
    with open(f"app/data/input_audio/{audio.filename}", "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)
    print('[LOG] 입력 음성 업로드 완료')
    section1_time = time.time() - section1_start

### [장르 판별]
    section2_start = time.time()
    genre, genre_list = determine_genre(audio.filename)
    print('[LOG] 장르 판별 완료 (',genre,')')
    section2_time = time.time() - section2_start

### [작사]
    section3_start = time.time()
    lyric = write_lyrics(genre)
    print('[LOG] 작사 완료 (',lyric[0:13],'...)')
    section3_time = time.time() - section3_start

### [작곡]
    section4_start = time.time()
    composition_path = composition(genre)
    if not composition_path: return { 'success': False }
    with open(composition_path, mode="rb") as file_like:
        file_content = b64encode(file_like.read())
    base64_file = file_content.decode('utf-8')
    section4_time = time.time() - section4_start
    print('[LOG] 작곡 완료 (',base64_file[0:10],')')

    print(f'[LOG] 입력 음성 업로드 소요시간: {section1_time:.1f}')
    print(f'[LOG] 장르 판별 소요시간: {section2_time:.1f}')
    print(f'[LOG] 작사 소요시간: {section3_time:.1f}')
    print(f'[LOG] 작곡 소요시간: {section4_time:.1f}')
    print(f'[LOG] 총 소요시간: {(time.time() - total_start):.1f}')

    return {
        "success": True,
        'base64_file': base64_file,
        "genre": genre,
        "genre_list": genre_list,
        "lyric": lyric
        }



