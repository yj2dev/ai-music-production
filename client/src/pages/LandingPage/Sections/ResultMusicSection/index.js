import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Container,
  MidiBox,
  MidiWrapper,
  ResultGenre,
  ResultLyric,
  Button,
  ShowChartButton,
  Test,
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

  const [numValue, setNumValue] = useState(0);
  const [counter, setCounter] = useState(5);
  const [lyricIndex, setLyricIndex] = useState([]);

  // console.log(counter);

  const TimerFunction = () => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    console.log(counter);

    for (let i = 0; i < 4; i++) {
      if (counter > 0) {
        TimerFunction();
      } else {
        setCounter(5);
        setNumValue(numValue + 1);
        console.log(i);
      }
    }
  }, [numValue]);

  useEffect(() => {
    setLyricIndex(lyric.split("\n"));
  }, [lyric]);

  // useEffect(() => {
  //   setLyricIndex(lyric.split("\n"));
  // }, [lyric]);

  // const testChange = () => {
  //   for (let i = 0; i < 4; ) {
  //     if (counter > 0) {
  //       counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

  //       console.log(counter);
  //       console.log(i);
  //     } else {
  //       // setNumValue(numValue + 1);
  //       // setCounter(5);
  //       i++;
  //     }
  //   }

  //   // return (
  //   //   <div>
  //   //     <h4>{lyricIndex[numValue]}</h4>
  //   //     <h4>{lyricIndex[numValue + 1]}</h4>
  //   //   </div>
  //   // );
  // };

  // function TestIndex() {
  //   var testarray = [];

  //   for (let i = 0; i < 3; ) {
  //     // testarray.push(<div>{i}</div>);

  //     if (counter != 0) {
  //       timeer();
  //     } else {
  //       testarray = (
  //         <div>
  //           <h4>{lyricIndex[i]}</h4>
  //           <h4>{lyricIndex[i + 1]}</h4>
  //         </div>
  //       );

  //       setCounter(5);
  //       i++;
  //     }
  //   }

  //   return testarray;
  // }

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

      {/* {TestIndex()} */}
      {/* {lyric != "" ? testChange() : null} */}

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
