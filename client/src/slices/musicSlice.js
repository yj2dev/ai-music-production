import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: "",
  lyric: "",
  midiData: "",
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    delGenre: (state) => {
      state.genre = "";
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
  setGenre,
  delGenre,
  setLyric,
  delLyric,
  setMidiData,
  delMidiData,
} = musicSlice.actions;

export default musicSlice.reducer;
