import React, { useEffect, useRef, useState } from "react";
import { Container } from "./styled";
import AudioPlayer from "osmd-audio-player";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

// const src = require("./example1.musicxml");
// const src = require("./example2.musicxml");
// const src = require("./output_dance_1664473137.musicxml");

function SheetMusic() {
  const [file, setFile] = useState(null);
  window.audioPlayer = new AudioPlayer();
  const divRef = useRef();

  useEffect(async () => {
    const osmd = new OpenSheetMusicDisplay(divRef.current);
    // await osmd.load(src);
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
