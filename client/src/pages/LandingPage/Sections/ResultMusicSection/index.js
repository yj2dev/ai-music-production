import React, { useRef } from "react";
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
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);

  return (
    <Container>
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
