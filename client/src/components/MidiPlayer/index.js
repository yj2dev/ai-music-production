import React, { useRef, useState } from "react";
import ReactMidiPlayer from "react-midi-player";
import ViewLyric from "../ViewLyric";
import { MidiBox, MidiWrapper } from "./styled";

function MidiPlayer({ onPlay, midiData, lyric }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isPause, setIsPause] = useState(false);

  if (!onPlay) return;
  return (
    <>
      <MidiBox>
        <MidiWrapper>
          <ReactMidiPlayer data={atob(midiData)} />
        </MidiWrapper>
      </MidiBox>
      {/*<ViewLyric lyric={lyric} isPlay={isPlay} isPause={isPause} />*/}
      <ViewLyric lyric={lyric} />
    </>
  );
}

export default MidiPlayer;
