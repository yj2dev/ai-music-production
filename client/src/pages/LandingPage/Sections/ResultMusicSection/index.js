import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Container,
  ResultGenre,
  ResultLyric,
  Button,
  ShowButton,
} from "./styled";
import { useSelector } from "react-redux";
import { genreOfKR } from "../../../../utils/Translate";
import MidiPlayer from "../../../../components/MidiPlayer";
import GenreChart from "../../../../components/GenreChart";
import SheetMusic from "../../../../components/SheetMusic";

function ResultMusicSection() {
  const genre = useSelector((state) => state.music.genre);
  const genreList = useSelector((state) => state.music.genreList);
  const genreScore = useSelector((state) => state.music.genreScore);
  const genreScoreLen = Object.keys(genreScore).length;
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);
  const [showChart, setShowChart] = useState(false);
  const [showLyric, setShowLyric] = useState(false);

  return (
    <Container>
      {genre && (
        <ResultGenre>
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </ResultGenre>
      )}

      {/*  장르 그래프 */}
      {genreScoreLen !== 0 && showChart && <GenreChart />}
      {genreScoreLen !== 0 && (
        <ShowButton onClick={() => setShowChart((prev) => !prev)}>
          {showChart ? "간략히" : "자세히보기"}
        </ShowButton>
      )}

      {/*작곡 결과.*/}
      {midiData && (
        <MidiPlayer onPlay={true} midiData={midiData} lyric={lyric} />
      )}

      <SheetMusic file />

      {genre && (
        <ShowButton onClick={() => setShowLyric((prev) => !prev)}>
          {showLyric ? "가사숨기기" : "전체가사보기"}
        </ShowButton>
      )}

      {/*작사 결과.*/}
      {showLyric && lyric && <ResultLyric>{lyric}</ResultLyric>}
      <Button
        style={{ marginBottom: "32px" }}
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
