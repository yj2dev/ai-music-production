import React, { useRef, useState } from "react";
import ReactMidiPlayer from "react-midi-player";
import ViewLyric from "../ViewLyric";
import { MidiBox, MidiWrapper } from "./styled";

function MidiPlayer({ onPlay, midiData, lyric }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isPause, setIsPause] = useState(false);

  function onClickPlay() {
    setIsPlay((prev) => !prev);
    console.log("isPlay >> ", isPlay);
  }

  if (!onPlay) return;
  return (
    <>
      <MidiBox>
        <MidiWrapper>
          <ReactMidiPlayer
            // autoplay 절대 사용금지(리랜더링 버그 존재)
            // autoplay={false}
            // onPlay={onClickPlay}
            // onPlay={() => {
            //   // setIsPlay(true);
            //   console.log("Play...");
            // }}
            // onStop={() => {
            //   // setIsPlay(false);
            //   console.log("Stop...");
            // }}
            // onPause={() => {
            //   setIsPause(true);
            //   console.log("Pause...");
            // }}
            // onResume={() => {
            //   setIsPause(false);
            //   console.log("Resume...");
            // }}
            data={atob(midiData)}
          />
        </MidiWrapper>
      </MidiBox>
      <ViewLyric lyric={lyric} isPlay={isPlay} isPause={isPause} />
      {/*<ViewLyric lyric={lyric} />*/}
    </>
  );
}

export default MidiPlayer;
