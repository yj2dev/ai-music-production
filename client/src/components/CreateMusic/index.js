import React, { useEffect, useRef, useState } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { MMSSFormat } from "../../utils/Time";
import {
  Container,
  Audio,
  Button,
  ScrollPosition,
  AIGenreLabel,
  AIGenreLabelWrapper,
} from "./styled";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  setGenre,
  setLyric,
  setMidiData,
  onCustom,
  offCustom,
  onLoading,
  offLoading,
  setGenreList,
  setGenreScore,
} from "../../slices/musicSlice";
import UserSetGenre from "../UserSetGenre";
import VoiceRecord from "../VoiceRecord";
import GenreListParsing from "../../utils/GenreListParsing";

function CreateMusic() {
  const nextRef = useRef(null);
  const nextPage = () => {
    nextRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.music.genre);
  const recordData = useSelector((state) => state.music.recordData);
  const recordURL = useSelector((state) => state.music.recordURL);
  const isRecord = useSelector((state) => state.music.isRecord);
  const isCustom = useSelector((state) => state.music.isCustom);
  const loading = useSelector((state) => state.music.loading);

  const onClickRequest = async () => {
    if (!recordData) return;
    const fd = new FormData();
    dispatch(onLoading());
    fd.append("audio", recordData, `user_${+new Date()}.wav`);

    axios
      .post("/api/music/create", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res data >> ", res.data);

        dispatch(setGenre(res.data.genre));
        dispatch(setLyric(res.data.lyric));
        dispatch(setMidiData(res.data.base64_file));

        // 장르 목록이 있으면 목록과 점수 저장
        if (res.data.hasOwnProperty("genre_list")) {
          dispatch(setGenreScore(res.data.genre_score));
          dispatch(setGenreList(GenreListParsing(res.data.genre_list)));
        }

        nextPage();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(offLoading());
      });
  };
  const onToggleCustom = (e) => {
    if (e.target.checked) dispatch(offCustom());
    else dispatch(onCustom());
  };

  return (
    <Container>
      <div className="content">
        {!isCustom &&
          !genre &&
          !recordURL &&
          !isRecord &&
          "마이크 버튼을 클릭해 녹음을 시작합니다"}
        {isCustom && !genre && !isRecord && "원하는 장르를 선택해 주세요"}
        {!isCustom && !genre && recordURL && !isRecord && (
          <>
            "녹음된 음성을 <span>확인</span> 후 곡을 생성해주세요!"
          </>
        )}
        {genre && "분석결과를 확인해주세요"}
      </div>
      {!isCustom && !genre && !loading && <VoiceRecord />}
      {!isCustom && !isRecord && recordURL && (
        <Audio controls src={recordURL} controlsList="nodownload" />
      )}
      {isCustom && !genre && <UserSetGenre nextPage={nextPage} />}
      {!isCustom && recordURL && !genre && (
        <Button
          onClick={onClickRequest}
          id={loading && "disabled"}
          disabled={loading}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!loading ? "맞춤곡 생성" : "곡 생성중 "}&nbsp;
            <PulseLoader
              color="#ffffff"
              size={10}
              margin={5}
              loading={loading}
            />
          </span>
        </Button>
      )}
      {!isRecord && !genre && !loading && (
        <AIGenreLabelWrapper>
          <label className="lb_title" htmlFor="isCustom">
            인공지능 목소리 장르분석
          </label>
          <AIGenreLabel>
            <input
              onChange={onToggleCustom}
              id="isCustom"
              type="checkbox"
              defaultChecked={true}
            />
            <span className="slider"></span>
          </AIGenreLabel>
        </AIGenreLabelWrapper>
      )}
      {genre && <Button onClick={nextPage}>결과확인</Button>}
      <ScrollPosition ref={nextRef} />
    </Container>
  );
}

export default CreateMusic;
