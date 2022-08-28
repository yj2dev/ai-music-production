import React from "react";
import Index from "../../../../components/MidiPlayer";
import { Container, SectionLine, MidiWrapper } from "./styled";
import { genreOfKR } from "../../../../utils/Translate";
import { useDispatch, useSelector } from "react-redux";
import VoiceRecord from "../../../../components/VoiceRecord";

const CreateMusicSection = () => {
  const genre = useSelector((state) => state.music.genre);
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);

  return (
    <Container>
      <VoiceRecord />

      {genre && <SectionLine />}
      {genre && (
        <div className="content">
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </div>
      )}
      <br />
      {genre && (
        <MidiWrapper>
          <Index onPlay={true} midiData={midiData} />
        </MidiWrapper>
      )}

      {lyric && <div className="content-lyric">{lyric}</div>}
    </Container>
  );
};

export default CreateMusicSection;
