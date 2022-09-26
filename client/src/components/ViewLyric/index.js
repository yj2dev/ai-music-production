import React, { useEffect, useRef } from "react";
import { Container, Sentence } from "./styled.js";
import useInterval from "../../hooks/useInterval";

// function ViewLyric({ lyric, sec = 1500 }) {
function ViewLyric({ lyric, sec = 1500, isPlay, isPause }) {
  const splitLyric = lyric.split("\n");
  const lyricRef = useRef([]);
  const lyricIdx = useRef(0);

  const { reset, stop } = useInterval(() => {
    lyricRef.current[lyricIdx.current]?.scrollIntoView({
      behavior: "smooth",
    });
    if (splitLyric.length <= lyricIdx.current) lyricIdx.current = 0;
    lyricIdx.current++;
  }, sec);

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
