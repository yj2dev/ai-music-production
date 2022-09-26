import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isCustom: false,
  isRecord: false,
  recordData: "",
  recordURL: "",
  genre: "dance",
  genreScore: {},
  genreList: [],
  lyric:
    "슬픔에 비틀 대는 너 \n 나를 보는 니 모습 평소와는 차원이 달라 \n 자꾸 시선 피하는 너 \n 내 맘을 뺏은 너 \n 돌아서는 뒷모습 보고만 있어 \n 사랑이란 쟁취하는 거 \n 그 무엇이 사랑이란 감정으로 \n 나를 지배하고 있어 \n 하지만 지금 너는 아닌 걸 \n 알면서 건드려 난 \n 상처받은 니 맘 \n 안을게 다시 그려낼게 \n 더 이상 떨지 말고 \n 용기내 조금도 주저하지 마 \n 넌 아직 청춘이야 \n 좀 더 기다려야 해 \n 널 그리는 지나간 story \n 좀 새로웠어 \n 유치한 내 상상 속 \n 어느 날 내 곁에서 떠난 너 \n 눈물 콧물 머금고 잊었어 \n bling your mind \n 꿈이라고 믿었던 그 시간이 \n 지금 너를 그리는 이유인 걸 \n 더 이상은 못 참아 내 모든 걸 주고 싶어 \n 거부할 수 없는 너 \n 나의 진심을 담아 너를 그리고 싶어 \n 하지만 지금은 아니야 \n 네 옆에 내가 있지 않아 \n 이제 please baby be mine \n i m walkin out of destiny \n 전율받는 저 뜨거운 선율 \n 내 마음을 찔러 너의 숨결 느껴 \n 그만하라고 소리쳐 내가 쓰러져 \n 아무도 모르는 얘기 네게만 해 \n 어차피 아무 일도 일어나지 않아 \n 지금 너는 뭘 그리 두려워하는 걸까 \n 이미 알고 있겠지만 \n 네 곁에 있는 것만으로도 \n 벅차오른 감정의 파도가 되어 \n 나를 덮칠 채비를 해 \n 이제 막 피어난 꽃처럼 \n 너의 숨결에 취해가 \n 잠시만이라도 녹아버리지 않게 \n 이 순간 나를 녹여주렴 \n i feel you \n 받아줄래 너 아직 미숙해 \n 그래 우린 여기까지야 \n 시간이 필요해 그치만 지금은 \n 행복한 꿈만 꾸는 거야 \n 꿈꾸던 그 시간 \n 지금 네가 있는 이곳에서 \n 숨을 쉬어 느껴지는 \n 떨리는 손끝 발끝에 닿아 \n 또다시 all night \n 아쉬운 발걸음 이 순간에 \n 담는걸 넌 이미 알고 있어 \n 이젠 더 이상",
  midiData:
    "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",
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    onLoading: (state) => {
      state.loading = true;
    },
    offLoading: (state) => {
      state.loading = false;
    },
    onRecord: (state) => {
      state.isRecord = true;
    },
    offRecord: (state) => {
      state.isRecord = false;
    },
    onCustom: (state) => {
      state.isCustom = true;
    },
    offCustom: (state) => {
      state.isCustom = false;
    },
    setRecordData: (state, action) => {
      state.recordData = action.payload;
    },
    delRecordData: (state) => {
      state.recordData = "";
    },
    setRecordURL: (state, action) => {
      state.recordURL = action.payload;
    },
    delRecordURL: (state) => {
      state.recordURL = "";
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    delGenre: (state) => {
      state.genre = "";
    },
    setGenreScore: (state, action) => {
      state.genreScore = action.payload;
    },
    delGenreScore: (state) => {
      state.genreScore = "";
    },
    setGenreList: (state, action) => {
      state.genreList = action.payload;
    },
    delGenreList: (state) => {
      state.genreList = [];
    },
    setLyric: (state, action) => {
      state.lyric = action.payload;
    },
    delLyric: (state) => {
      state.lyric = "";
    },
    setMidiData: (state, action) => {
      state.midiData = action.payload;
    },
    delMidiData: (state) => {
      state.midiData = "";
    },
  },
});

export const {
  onLoading,
  offLoading,
  onCustom,
  offCustom,
  onRecord,
  offRecord,
  setRecordData,
  delRecordData,
  setRecordURL,
  delRecordURL,
  setGenre,
  delGenre,
  setGenreScore,
  delGenreScore,
  setGenreList,
  delGenreList,
  setLyric,
  delLyric,
  setMidiData,
  delMidiData,
} = musicSlice.actions;

export default musicSlice.reducer;
