import axios from "axios";
import { setGenre, setLyric, setMidiData } from "../../slices/musicSlice";
import { Button, GenreButton, GenreButtonWrapper } from "../VoiceRecord/styled";
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";

function UserSetGenre() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("ballad");

  const onClickGenre = (e) => {
    setSelectedGenre(e.target.value);
  };

  const onSubmitSeletedGenre = () => {
    if (selectedGenre === "") return;
    setLoading(true);
    axios
      .get(`/api/music/create/${selectedGenre}?keyword=apple`)
      .then((res) => {
        dispatch(setGenre(res.data.genre));
        dispatch(setLyric(res.data.lyric));
        dispatch(setMidiData(res.data.base64_file));
        // nextPage();
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
    </>
  );
}

export default UserSetGenre;
