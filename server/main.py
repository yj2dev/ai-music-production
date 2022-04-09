import uvicorn
from fastapi import FastAPI, Request, Form, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

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

templates = Jinja2Templates(directory="views")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get('/', response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", { "request": request })

@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse("index.html", {"request": request, "id": id})

@app.post("/set-item", response_class=HTMLResponse)
async def read_item2(audio: UploadFile):
    # print("request >> ", request)
    # print('audio length >> ', len(audio))
    print('audio name >> ', audio.filename)
    # print('audio >> ', audio)
    content = await audio.read()
    print('content size >> ', len(content))

    return "OK"

    # return templates.TemplateResponse("index.html", {"request": request, "id": id})

@app.get("/test", response_class=HTMLResponse)
async def test(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "state": True, "uid": '3fjewioj21mmsakl'})


@app.get("/test2", response_class=HTMLResponse)
async def test2(request: Request):
    return { 'img-url': 'https://aw3-eafs21-afopf', 'price': 540000 }




if __name__ == '__main__':
    uvicorn.run(app)