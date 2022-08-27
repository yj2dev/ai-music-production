 ## 프로젝트 실행방법
 

### 프로젝트 참여인원(7명)
김주영, 송수영, 송유선, 이유진, 위규연, 조계원, 홍경석 
### client
 ```
cd client
npm i
npm start
 ```
### server 
작사 모델을 다운받은후 server/app/model/write_lyrics_model 경로에 넣어준다
```
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```
### 