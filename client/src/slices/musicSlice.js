import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isCustom: false,
  isRecord: false,
  recordData: "",
  recordURL: "",
  genre: "",
  genreList: [],
  lyric: "",
  midiData: "",
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
  setLyric,
  delLyric,
  setMidiData,
  delMidiData,
  setGenreList,
  delGenreList,
} = musicSlice.actions;

export default musicSlice.reducer;
