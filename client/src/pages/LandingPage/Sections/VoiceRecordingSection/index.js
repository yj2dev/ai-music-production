// https://stackoverflow.com/questions/65191193/media-recorder-save-in-wav-format-across-browsers
import React from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import {
  Container,
  RecordingButtonWrapper,
  RecordingButton,
  OffIcon,
  Audio,
  Button,
} from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdKeyboardVoice } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { MMSSFormat } from "../../../../utils/Time";
import PulseLoader from "react-spinners/PulseLoader";

const VoiceRecordingSection = () => {
  const REC_LIMIT_TIME = 120;
  const [onRecording, setOnRecording] = useState(false);
  const [audioData, setAudioData] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [stream, setStream] = useState("");
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [media, setMedia] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  async function extendMediaRecoder() {
    await register(await connect());
  }

  useEffect(() => {
    extendMediaRecoder(); // ".wav" 확장자로 변환을 지원
  }, []);

  const onClickOnRecording = async () => {
    setAudioURL("");
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    const makeSound = (stream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    };

    // 마이크 사용 권한 확인
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/wav",
      });
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = (e) => {
        // REC_LIMIT_TIME(초)가 지나면 자동으로 녹음 중지
        setTimer(MMSSFormat(parseInt(e.playbackTime)));

        if (e.playbackTime > REC_LIMIT_TIME) {
          stream.getAudioTracks().forEach((track) => {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = (e) => {
            setAudioData(e.data);
            setOnRecording(false);
          };
        } else {
          setOnRecording(true);
        }
      };
    });
  };

  const onClickOffRecording = () => {
    media.ondataavailable = (e) => {
      setAudioData(e.data);
      setAudioURL(URL.createObjectURL(e.data));
      setOnRecording(false);
    };

    stream.getAudioTracks().forEach((track) => {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onClickRequest = () => {
    console.log("전송");
    if (!audioData) return;

    const fd = new FormData();
    setLoading(true);

    fd.append("audio", audioData, `user_${+new Date()}.wav`);

    axios
      .post("http://localhost:8000/api/music/create", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res >> ", res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // const onClickAudioDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = window.URL.createObjectURL(audioData);
  //   link.download = `user_${+new Date()}.wav`;
  //   link.click();
  // };

  return (
    <Container className={onRecording && "active"}>
      {!onRecording && (
        <div className="content">
          {!audioURL ? (
            <>"버튼을 클릭하여 녹음을 시작합니다"</>
          ) : (
            <>
              "녹음된 음성을 <span>확인</span> 후 곡을 생성해주세요!"
            </>
          )}
        </div>
      )}
      <RecordingButtonWrapper
        className={onRecording && "active"}
        onClick={!onRecording ? onClickOnRecording : onClickOffRecording}
      >
        {onRecording && <div className="timer">{timer}</div>}
        {onRecording && (
          <div
            className="tip-icon"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
          >
            <RiErrorWarningFill />
          </div>
        )}
        {onRecording && showTip && (
          <div className="tip-modal">최대 2분까지 녹음할 수 있습니다.</div>
        )}
        <RecordingButton>
          {!onRecording ? (
            <>
              <MdKeyboardVoice />
            </>
          ) : (
            <>
              <OffIcon />
            </>
          )}
        </RecordingButton>
      </RecordingButtonWrapper>
      {audioURL && <Audio controls src={audioURL} controlsList="nodownload" />}
      {audioURL && (
        <Button
          onClick={onClickRequest}
          id={loading && "disabled"}
          disabled={loading}
        >
          {!loading ? "맞춤곡 생성" : "곡 생성중 "}
          <PulseLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </Button>
      )}
      {/*<Button onClick={onClickAudioDownload}>녹음파일 다운로드</Button> <br />*/}
    </Container>
  );
};

export default VoiceRecordingSection;
