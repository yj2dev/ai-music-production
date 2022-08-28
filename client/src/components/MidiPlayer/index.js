import React from "react";
import ReactMidiPlayer from "react-midi-player";

function MidiPlayer({ onPlay, midiData }) {
  if (!onPlay) return;
  return <ReactMidiPlayer data={atob(midiData)} />;
}

export default MidiPlayer;
