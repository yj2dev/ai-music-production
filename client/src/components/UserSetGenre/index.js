import axios from "axios";
import { setGenre, setLyric, setMidiData } from "../../slices/musicSlice";
import { Button } from "../VoiceRecord/styled";
import {
  InputWrapper,
  GenreButton,
  GenreButtonWrapper,
  ScrollPosition,
} from "./styled";
import React, { useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";

function UserSetGenre() {
  const nextRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("ballad");
  const [keyword, setKeyword] = useState("");

  const nextPage = () => {
    nextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClickGenre = (e) => {
    setSelectedGenre(e.target.value);
  };

  const onChangeKeyword = (e) => {
    if (e.target.value.length > 12) return;
    setKeyword(e.target.value);
  };

  const onSubmitSeletedGenre = () => {
    if (selectedGenre === "") return;
    setLoading(true);
    axios
      .get(`/api/music/create/${selectedGenre}?keyword=${keyword}`)
      .then((res) => {
        dispatch(setGenre(res.data.genre));
        dispatch(setLyric(res.data.lyric));
        dispatch(setMidiData(res.data.base64_file));
        nextPage();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <GenreButtonWrapper>
        <GenreButton
          onClick={onClickGenre}
          className={selectedGenre === "ballad" && "active"}
          value="ballad"
        >
          발라드
        </GenreButton>
        <GenreButton
          className={selectedGenre === "trot" && "active"}
          onClick={onClickGenre}
          value="trot"
        >
          트로트
        </GenreButton>
      </GenreButtonWrapper>
      <GenreButtonWrapper>
        <GenreButton
          className={selectedGenre === "dance" && "active"}
          onClick={onClickGenre}
          value="dance"
        >
          댄스
        </GenreButton>
        <GenreButton
          className={selectedGenre === "hiphop" && "active"}
          onClick={onClickGenre}
          value="hiphop"
        >
          힙합
        </GenreButton>
      </GenreButtonWrapper>
      <InputWrapper>
        <input
          type="text"
          value={keyword}
          onChange={onChangeKeyword}
          placeholder="키워드를 입력해주세요."
        />
      </InputWrapper>
      <Button
        onClick={onSubmitSeletedGenre}
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
          <PulseLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </span>
      </Button>
      <ScrollPosition ref={nextRef} />
    </>
  );
}

export default UserSetGenre;
