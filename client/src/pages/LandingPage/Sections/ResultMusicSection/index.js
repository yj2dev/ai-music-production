import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Container,
  MidiBox,
  MidiWrapper,
  ResultGenre,
  ResultLyric,
  MiddleResultLyric,
  MiddleResultLyric_TextBox,
  Button,
  ShowChartButton,
  ButtonCollect,
} from "./styled";
import { useSelector } from "react-redux";
import { genreOfKR } from "../../../../utils/Translate";
import MidiPlayer from "../../../../components/MidiPlayer";
import GenreChart from "../../../../components/GenreChart";
import Abcjs from "react-abcjs";

function ResultMusicSection() {
  const genre = useSelector((state) => state.music.genre);
  const genreList = useSelector((state) => state.music.genreList);
  const genreScore = useSelector((state) => state.music.genreScore);
  const genreScoreLen = Object.keys(genreScore).length;
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);
  const [showChart, setShowChart] = useState(false);

  const intervalRef = useRef(null);
  const [numValue, setNumValue] = useState(0);

  const [lyricIndex, setLyricIndex] = useState([]);
  const [everyLyric, setEveryLyric] = useState(false);

  const [isPlay, setIsPlay] = useState(false);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setNumValue((c) => c + 1);
    }, 1500);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    setLyricIndex(lyric.split("\n"));
  }, [lyric]);

  return (
    <Container>
      {/*<Abcjs*/}
      {/*  abcNotation={*/}
      {/*    "X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|"*/}
      {/*  }*/}
      {/*  parserParams={{}}*/}
      {/*  engraverParams={{ responsive: "resize" }}*/}
      {/*  renderParams={{ viewportHorizontal: true }}*/}
      {/*/>*/}

      {genre && (
        <ResultGenre>
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </ResultGenre>
      )}

      {/*  장르 그래프 */}
      {genreScoreLen !== 0 && showChart && <GenreChart />}
      {genreScoreLen !== 0 && (
        <ShowChartButton onClick={() => setShowChart((prev) => !prev)}>
          {showChart ? "간략히" : "자세히보기"}
        </ShowChartButton>
      )}

      {/*작곡 결과입니다.*/}
      {midiData && (
        <MidiBox>
          <MidiWrapper>
            <MidiPlayer onPlay={true} midiData={midiData} />
          </MidiWrapper>
        </MidiBox>
      )}

      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>

      <MiddleResultLyric>
        <MiddleResultLyric_TextBox primary>
          {lyricIndex[numValue]}
        </MiddleResultLyric_TextBox>
        <MiddleResultLyric_TextBox>
          {lyricIndex[numValue + 1]}
        </MiddleResultLyric_TextBox>
      </MiddleResultLyric>

      {/*작사 결과입니다.*/}

      {lyric && everyLyric ? <ResultLyric>{lyric}</ResultLyric> : null}

      <ButtonCollect>
        <Button
          color="#99F"
          onClick={() => {
            setEveryLyric(!everyLyric);
          }}
        >
          {everyLyric ? "가사 숨기기" : "전체가사 보기"}
        </Button>

        <Button
          onClick={() => {
            window.location.reload("/");
          }}
        >
          다시하기
        </Button>
      </ButtonCollect>
    </Container>
  );
}

export default ResultMusicSection;
