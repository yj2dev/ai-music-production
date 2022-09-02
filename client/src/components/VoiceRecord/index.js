import React, { useEffect, useState } from "react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { MMSSFormat } from "../../utils/Time";
import { connect } from "extendable-media-recorder-wav-encoder";
import {
  offRecord,
  onRecord,
  setRecordData,
  setRecordURL,
} from "../../slices/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import { OffIcon, RecordingButton, RecordingButtonWrapper } from "./styled";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdKeyboardVoice } from "react-icons/md";

function VoiceRecord() {
  const REC_LIMIT_TIME = 120;
  const dispatch = useDispatch();
  const isRecord = useSelector((state) => state.music.isRecord);

  const [stream, setStream] = useState("");
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [media, setMedia] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    extendMediaRecoder(); // ".wav" 확장자로 변환을 지원
  }, []);

  const onClickOnRecording = async () => {
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
            dispatch(setRecordData(e.data));
            dispatch(offRecord());
          };
        } else {
          dispatch(onRecord());
        }
      };
    });
  };

  const onClickOffRecording = () => {
    media.ondataavailable = (e) => {
      dispatch(setRecordData(e.data));
      dispatch(setRecordURL(URL.createObjectURL(e.data)));
      dispatch(offRecord());
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

  return (
    <RecordingButtonWrapper
      className={isRecord && "active"}
      onClick={!isRecord ? onClickOnRecording : onClickOffRecording}
    >
      {isRecord && <div className="timer">{timer}</div>}
      {isRecord && (
        <div
          className="tip-icon"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <RiErrorWarningFill />
        </div>
      )}
      {isRecord && showTip && (
        <div className="tip-modal">최대 2분까지 녹음할 수 있습니다.</div>
      )}
      <RecordingButton>
        {!isRecord ? (
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
  );
}

export default VoiceRecord;
