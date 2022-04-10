import uvicorn
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.routes import index, music

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
    # uvicorn.run("main:app")
    uvicorn.run(app)