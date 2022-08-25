// https://stackoverflow.com/questions/65191193/media-recorder-save-in-wav-format-across-browsers
import React, { useRef } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import MidiPlayer from "react-midi-player";
import {
  Container,
  RecordingButtonWrapper,
  RecordingButton,
  OffIcon,
  Audio,
  Button,
  SectionLine,
} from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdKeyboardVoice } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { MMSSFormat } from "../../../../utils/Time";
import PulseLoader from "react-spinners/PulseLoader";
import { genreOfKR } from "../../../../utils/Translate";

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

  const [genre, setGenre] = useState("");
  const [lyric, setLyric] = useState("");

  const [midiData, setMidiData] = useState("");
  const [resultURL, setResultURL] = useState("");

  async function extendMediaRecoder() {
    await register(await connect());
  }

  useEffect(() => {
    extendMediaRecoder(); // ".wav" 확장자로 변환을 지원
  }, []);

  const resetResult = () => {
    setGenre("");
    setLyric("");
    setAudioURL("");
  };

  const onClickOnRecording = async () => {
    resetResult();
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

  const onClickRequest = async () => {
    console.log("전송");
    if (!audioData) return;

    const fd = new FormData();
    setLoading(true);

    fd.append("audio", audioData, `user_${+new Date()}.wav`);

    console.log("audioData >> ", audioData);

    axios
      .post("http://localhost:8000/api/music/create", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res >> ", res);
        // console.log("res.data >> ", res.data);

        function _arrayBufferToBase64(buffer) {
          console.log("buffer >> ", buffer);
          let binary = "";
          let bytes = new Uint8Array(buffer);
          let len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return window.btoa(binary);
        }

        const toString = _arrayBufferToBase64(res.data);
        console.log("toString >> ", toString);

        setMidiData(
          atob(
            "\
TVRoZAAAAAYAAQADAGRNVHJrAAAAGgD/AwtMaXR0bGUgTGFtZQD/UQMKLCsA/y8ATVRyawAAAPMA/wMG\
THlyaWNzAP8BGEBUTWFyeSBXYXMgQSBMaXR0bGUgTGFtZWT/AQNcTWFL/wEDcnkgGf8BBHdhcyAy/wEC\
YSAy/wEDbGl0Mv8BBHRsZSAy/wEFbGFtZSxk/wEEL0xpdDL/AQR0bGUgMv8BBWxhbWUsZP8BBC9MaXQy\
/wEEdGxlIDL/AQVsYW1lLGT/AQMvTWFL/wEDcnkgGf8BBHdhcyAy/wECYSAy/wEDbGl0Mv8BBHRsZSAy\
/wEFbGFtZSwy/wEDL0EgMv8BA2xpdDL/AQR0bGUgMv8BBWxhbWUgMv8BBHdhcyAy/wEEc2hlIQD/LwBN\
VHJrAAAA8gD/AwVNdXNpYwDAC2SQQH9LgEBAAJA+fxmAPkAAkDx/MoA8QACQPn8ygD5AAJBAfzKAQEAA\
kEB/MoBAQACQQH9agEBACpA+fzKAPkAAkD5/MoA+QACQPn9agD5ACpBAfzKAQEAAkEN/MoBDQACQQ39a\
gENACpBAf0uAQEAAkD5/GYA+QACQPH8ygDxAAJA+fzKAPkAAkEB/MoBAQACQQH8ygEBAAJBAfzKAQEAZ\
kEB/GYBAQACQPn8ygD5AAJA+fzKAPkAAkEB/MoBAQACQPn8ygD5AAJA8f2RAZABDZABIf1qAPEAAQEAA\
Q0AASEAK/y8A"
          )
        );

        const a = new Blob([new Uint8Array(res.data)]);
        console.log("a >> ", a);

        setGenre(res.data.genre);
        setLyric(res.data.lyric);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
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
      {/*<Audio controls src={resultURL} controlsList="nodownload" />*/}

      <MidiPlayer data={midiData} />
      {/*<MidiPlayer src= />*/}
      {/*<input*/}
      {/*  type="file"*/}
      {/*  accept="audio/wav"*/}
      {/*  onChange={(e) => {*/}
      {/*    // setOnRecording(true);*/}
      {/*    setAudioData(e.target.files[0]);*/}
      {/*  }}*/}
      {/*/>*/}
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
      {audioURL && !genre && (
        <Button
          onClick={onClickRequest}
          id={loading && "disabled"}
          disabled={loading}
        >
          {!loading ? "맞춤곡 생성" : "곡 생성중 "}
          <PulseLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </Button>
      )}
      {genre && <SectionLine />}
      {genre && (
        <div className="content">
          당신의 음성은 <span>{genreOfKR(genre)}</span>에 잘 어울립니다.
        </div>
      )}
      {lyric && <div className="content-lyric">{lyric}</div>}
    </Container>
  );
};

export default VoiceRecordingSection;
