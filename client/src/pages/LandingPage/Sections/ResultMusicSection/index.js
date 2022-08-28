import React, { useRef } from "react";
import { Container, MidiBox, MidiWrapper, SectionLine } from "./styled";
import { useSelector } from "react-redux";
import { genreOfKR } from "../../../../utils/Translate";
import MidiPlayer from "../../../../components/MidiPlayer";

function ResultMusicSection() {
  const genre = useSelector((state) => state.music.genre);
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);

  return (
    <Container>
      {genre && <SectionLine />}
      {genre && (
        <div className="content">
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </div>
      )}

      {genre && (
        <MidiBox>
          <MidiWrapper>
            <MidiPlayer onPlay={true} midiData={midiData} />
          </MidiWrapper>
        </MidiBox>
      )}
      {lyric && <div className="content-lyric">{lyric}</div>}
    </Container>
  );
}

export default ResultMusicSection;
