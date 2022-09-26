import React, { useEffect, useRef } from "react";
import { Container, Sentence } from "./styled.js";
import useInterval from "../../hooks/useInterval";

// function ViewLyric({ lyric, sec = 1500 }) {
function ViewLyric({ lyric, sec = 1500, isPlay, isPause }) {
  const splitLyric = lyric.split("\n");
  const lyricRef = useRef([]);
  const lyricIdx = useRef(0);

  console.log("isPlay >> ", isPlay);
  console.log("isPause >> ", isPause);

  // const { reset, stop } = useInterval(() => {
  //   if (!isPlay) {
  //     console.log("일시정지");
  //     stop();
  //     // return;
  //   } else {
  //     console.log("재개");
  //   }
  //
  //   lyricRef.current[lyricIdx.current]?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  //   if (splitLyric.length <= lyricIdx.current) lyricIdx.current = 0;
  //   lyricIdx.current++;
  // }, sec);

  // if (!isPlay) {
  //    console.log("일시정지");
  //    stop();
  //    // return;
  //  } else {
  //    console.log("재개");
  //  }

  // useInterval(() => {
  //   console.log("lyricIdx >> ", lyricIdx.current);
  //   console.log("isPlay >> ", isPlay);
  //   console.log("isPause >> ", isPause);
  //   if (isPlay) {
  //     console.log("재생 시작");
  //   } else {
  //     console.log("재생 중단");
  //     lyricIdx.current = 0;
  //     return;
  //   }
  //
  //   if (isPause) {
  //     console.log("일시정지 동작");
  //     return;
  //   } else {
  //     console.log("일시정지 재개");
  //   }
  //   lyricRef.current[lyricIdx.current]?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  //   if (splitLyric.length <= lyricIdx.current) lyricIdx.current = 0;
  //   lyricIdx.current++;
  // }, sec);

  return (
    <Container>
      {splitLyric &&
        splitLyric.map((v, i) => (
          <Sentence ref={(el) => (lyricRef.current[i] = el)}>{v}</Sentence>
        ))}
    </Container>
  );
}

export default ViewLyric;
