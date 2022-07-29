from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from xgboost import XGBClassifier
import sklearn.preprocessing
import pandas as pd
import librosa
import time
import os

### 초기 설정
INPUT_PATH = "app/routes/data/input_audio"    # 입력음성이 들어갈 폴더 경로 지정
MUSIC_PROP = "app/routes/utils/extract_music_prop_0727_70.csv"    # 추출된 음악속성 CSV 경로 지정

def determine_genre(filename = None):
    ### 속성 추출 함수
    def extract_music_prop(filename = None):
        path = f"{INPUT_PATH}/{filename}"
        audio_info = [None for _ in range(60)]
        y, sr = librosa.load(path)
        y, _ = librosa.effects.trim(y=y)
        length = int(len(y) / sr)
        chromagram = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=512)
        rmsTest = librosa.feature.rms(y=y)
        spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
        rolloffTest = librosa.feature.spectral_rolloff(y=y, sr=sr)
        rolloffTest.mean()
        rolloffTest.var()
        zero_crossings = librosa.zero_crossings(y=y, pad=False)
        y_harm, y_perc = librosa.effects.hpss(y=y)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)

        audio_info[0] = filename
        audio_info[1] = length
        audio_info[2] = chromagram.mean()
        audio_info[3] = chromagram.var()
        audio_info[4] = rmsTest.mean()
        audio_info[5] = rmsTest.var()
        audio_info[6] = spectral_centroids.mean()
        audio_info[7] = spectral_centroids.var()
        audio_info[8] = spectral_bandwidth.mean()
        audio_info[9] = spectral_bandwidth.var()
        audio_info[10] = rolloffTest.mean()
        audio_info[11] = rolloffTest.var()
        audio_info[12] = zero_crossings.mean()
        audio_info[13] = zero_crossings.var()
        audio_info[14] = y_harm.mean()
        audio_info[15] = y_harm.var()
        audio_info[16] = y_perc.mean()
        audio_info[17] = y_perc.var()
        audio_info[18] = tempo

        def normalize(x, axis=0):
            return sklearn.preprocessing.minmax_scale(x, axis=axis)
        mfccs = librosa.feature.mfcc(y=y, sr=sr)
        mfccs = normalize(mfccs, axis=1)

        for i in range(19, 59, 2):
            idx = int((i - 18) / 2)
            audio_info[i] = mfccs[idx].mean()
            audio_info[1 + i] = mfccs[idx].var()

        audio_info[59] = None
        return audio_info\

    ### 입력받은 목소리 속성 추출 후 원본 데이터프레임에 추가
    df = pd.read_csv(MUSIC_PROP, index_col='filename')
    audio_info = extract_music_prop(filename)
    audio_info.pop(0)
    df.loc[filename] = audio_info

    ### 코사인 시밀러리티 생성
    labels = df[['label']]
    df = df.drop(columns=['length', 'label'])
    df_scaled = sklearn.preprocessing.scale(df)
    df = pd.DataFrame(df_scaled, columns=df.columns)
    similarity = cosine_similarity(df)
    sim_df = pd.DataFrame(similarity, index=labels.index, columns=labels.index)
    sim_df.head()

    ### 입력받은 음성과 유사한 곡 추천
    def find_similar_songs(name, n = 16):
        try:
            series = sim_df[name].sort_values(ascending=False)
        except:
            print("해당 곡은 존재하지 않습니다.")
        series = series.drop(name)
        return series.head(n).to_frame()

    similar_songs = find_similar_songs(filename)
    print(similar_songs)

    ### 점수가 가장 높은 장르 추천
    genre_score = {}
    for v in similar_songs.iterrows():
        genre = v[0].split(".")[0]
        score = v[1][0]
        if genre in genre_score: genre_score[genre] += score
        else: genre_score[genre] = score

    max_genre = max(genre_score, key=genre_score.get)
#     print("[선별된 장르목록]\n", similar_songs)
#     print("[추천 장르] ", max_genre)
    return max_genre