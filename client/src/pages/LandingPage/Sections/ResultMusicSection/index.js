import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Container,
  MidiBox,
  MidiWrapper,
  ResultGenre,
  ResultLyric,
  Button,
  ShowChartButton,
} from "./styled";
import { useSelector } from "react-redux";
import { genreOfKR } from "../../../../utils/Translate";
import MidiPlayer from "../../../../components/MidiPlayer";
import GenreChart from "../../../../components/GenreChart";

function ResultMusicSection() {
  const genre = useSelector((state) => state.music.genre);
  const genreList = useSelector((state) => state.music.genreList);
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);
  const [showChart, setShowChart] = useState(false);

  return (
    <Container>
      {genre && (
        <ResultGenre>
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </ResultGenre>
      )}

      {/*  장르 그래프 */}
      {showChart && <GenreChart />}
      <ShowChartButton onClick={() => setShowChart((prev) => !prev)}>
        {showChart ? "간략히" : "자세히보기"}
      </ShowChartButton>

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
