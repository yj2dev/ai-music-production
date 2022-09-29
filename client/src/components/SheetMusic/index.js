import React, { useEffect, useRef, useState } from "react";
import { Container } from "./styled";
import AudioPlayer from "osmd-audio-player";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
// import opensheetmusicdisplay from "opensheetmusicdisplay";
const src = require("./danceLSTM_output1.musicxml");
// const src = require("./full-music-sheet.musicxml");
// const src = require("./full-music-sheet.xml");
// console.log("src >> ", src);
function SheetMusic() {
  const [file, setFile] = useState(null);
  window.audioPlayer = new AudioPlayer();
  const divRef = useRef();

  // setFile(src);

  useEffect(async () => {
    const osmd = new OpenSheetMusicDisplay(divRef.current);
    // osmd.load("./danceLSTM_output1.musicxml");
    // await osmd.load("./full-music-sheet.musicxml");
    await osmd.load(src);
    await osmd.render();
    await window.audioPlayer.loadScore(osmd);
  }, []);

  const play = () => {
    window.audioPlayer.play();
  };

  const pause = () => {
    window.audioPlayer.pause();
  };

  const stop = () => {
    window.audioPlayer.stop();
  };

  return (
    <Container>
      <h3>악보 출력 예제</h3>
      <div className="controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
      <div ref={divRef} />
    </Container>
  );
}

export default SheetMusic;
