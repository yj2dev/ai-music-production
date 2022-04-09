// import { Container } from "styled.js";

import { Container } from "./styled";
import { useCallback, useState } from "react";

const VoiceRecordingSection = () => {
  const [onRecording, setOnRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const [stream, setStream] = useState("");
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [media, setMedia] = useState("");

  const onClickOnRecording = async () => {
    console.log("onClickOnRecording");

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log("audioCtx >> ", audioCtx);

    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);
    console.log("analyser >> ", analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      console.log("source >> ", source);
      setSource(source);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 확인
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = (e) => {
        // 2분(120초)가 지나면 자동으로 녹음 중지
        console.log("녹음 시작");
        if (e.playbackTime > 120) {
          stream.getAudioTracks().forEach((track) => {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = (e) => {
            setAudioURL(e.data);
            setOnRecording(false);
          };
        } else {
          // 녹음이 시작됬을 때 녹음 상태 true로 변경
          setOnRecording(true);
        }
      };
    });
  };

  const onClickOffRecording = () => {
    console.log("onClickOffRecording");

    media.ondataavailable = (e) => {
      console.log("ondataavailable  e >> ", e);
      setAudioURL(e.data);
      setOnRecording(false);
    };

    stream.getAudioTracks().forEach((track) => {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioURL) {
      console.log("blob >> ", URL.createObjectURL(audioURL));
    }

    const sound = new File([audioURL], "soundBlob", {
      type: "audio/ogg",
      lastModified: new Date().getTime(),
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(sound);
    link.download = `${+new Date()}.wav`;
    link.click();

    console.log("audioURL >> ", audioURL);
    console.log("sound >> ", sound);
  }, [audioURL]);

  const onClickAudioDownload = () => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(audioURL);
    link.download = `${+new Date()}`;
    link.click();
  };

  return (
    <Container>
      <button onClick={!onRecording ? onClickOnRecording : onClickOffRecording}>
        {!onRecording ? "녹음 시작" : "녹음 중지"}
      </button>
      <audio src={audioURL}></audio>

      <button onClick={onSubmitAudioFile}>녹음 결과 확인</button>
      <button onClick={onClickAudioDownload}>다운로드</button>
    </Container>
  );
};

export default VoiceRecordingSection;
