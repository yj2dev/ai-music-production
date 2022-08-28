import React, { useEffect, useState } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { MMSSFormat } from "../../utils/Time";
import {
  Container,
  Audio,
  Button,
  OffIcon,
  RecordingButton,
  RecordingButtonWrapper,
} from "./styled";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdKeyboardVoice } from "react-icons/md";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  setGenre,
  delGenre,
  setLyric,
  delLyric,
  setMidiData,
  delMidiData,
} from "../../slices/musicSlice";

function VoiceRecord() {
  const dispatch = useDispatch();

  const genre = useSelector((state) => state.music.genre);
  const lyric = useSelector((state) => state.music.lyric);
  const midiData = useSelector((state) => state.music.midiData);

  const [onRecording, setOnRecording] = useState(false);
  const [audioData, setAudioData] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const REC_LIMIT_TIME = 120;

  const [stream, setStream] = useState("");
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [media, setMedia] = useState("");

  const [timer, setTimer] = useState("00:00");
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [midiOnPlay, setMidiOnPlay] = useState(false);

  const resetResult = () => {
    dispatch(delGenre());
    dispatch(delLyric());
    dispatch(delMidiData());

    setMidiOnPlay(false);
    setAudioURL("");
  };

  useEffect(() => {
    extendMediaRecoder(); // ".wav" 확장자로 변환을 지원
  }, []);

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

  async function extendMediaRecoder() {
    await register(await connect());
  }

  const onClickRequest = async () => {
    if (!audioData) return;
    const fd = new FormData();
    setLoading(true);
    fd.append("audio", audioData, `user_${+new Date()}.wav`);

    axios
      .post("/api/music/create", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(setGenre(res.data.genre));
        dispatch(setLyric(res.data.lyric));
        dispatch(setMidiData(res.data.base64_file));
        setMidiOnPlay(true);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container>
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
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!loading ? "맞춤곡 생성" : "곡 생성중 "}&nbsp;
            <PulseLoader
              color="#ffffff"
              size={10}
              margin={5}
              loading={loading}
            />
          </span>
        </Button>
      )}
    </Container>
  );
}

export default VoiceRecord;
