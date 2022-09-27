from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile
from app.routes import index, music
from dotenv import load_dotenv
import uvicorn
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

def create_app():
    app = FastAPI()
    origins = [
        "http://localhost:3000",
        "https://subtle-croquembouche-77491b.netlify.app",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(index.router)
    app.include_router(music.router)

    return app

app = create_app()

if __name__ == '__main__':
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=8709,
                # ssl_keyfile="./key.pem",
                # ssl_certfile="./cert.pem"
                )

