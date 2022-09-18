import React, { useLayoutEffect, useRef } from "react";
import {
  Container,
  MidiBox,
  MidiWrapper,
  ResultGenre,
  ResultLyric,
  Button,
} from "./styled";
import { useSelector } from "react-redux";
import { genreOfKR } from "../../../../utils/Translate";
import MidiPlayer from "../../../../components/MidiPlayer";

function ResultMusicSection() {
  const genre = useSelector((state) => state.music.genre);
  const genreList = useSelector((state) => state.music.genreList);
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);

  console.log("genreList >> ", genreList);
  // console.log(
  //   genreList.map((v) => {
  //     console.log("v.name >> ", v.name);
  //   })
  // );
  return (
    <Container>
      <div style={{ border: "4px solid red", width: "500px", height: "700px" }}>
        {genreList &&
          genreList.map((v) => (
            <div>
              장르: {v.genre} 곡명: {v.name} 유사도: {v.similarity}
            </div>
          ))}
      </div>

      {genre && (
        <ResultGenre>
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </ResultGenre>
      )}
      {/*작곡 결과입니다.*/}
      {midiData && (
        <MidiBox>
          <MidiWrapper>
            <MidiPlayer onPlay={true} midiData={midiData} />
          </MidiWrapper>
        </MidiBox>
      )}
      {/*작사 결과입니다.*/}
      {lyric && <ResultLyric>{lyric}</ResultLyric>}
      <Button
        onClick={() => {
          window.location.reload("/");
        }}
      >
        다시하기
      </Button>
    </Container>
  );
}

export default ResultMusicSection;
