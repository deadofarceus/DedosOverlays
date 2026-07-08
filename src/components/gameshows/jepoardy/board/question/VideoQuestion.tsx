import { useEffect, useRef, useState } from "react";
import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";
import { useQuery } from "../../../../../types/UsefulFunctions";
import { useAudioSettings } from "../../../../../context/AudioSettingsContext";
import { BroadcastWebsocket } from "../../../../../types/WebsocketTypes";

function VideoQuestion({ question }: JepoardySingleQuestionProps) {
  const query = useQuery();
  const id = query.get("id");
  const { buzzerVolume } = useAudioSettings();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wsRef = useRef<BroadcastWebsocket<string> | null>(null);
  const [startStopSignal, setStartStopSignal] = useState<string>("");

  if (!id) {
    return <></>;
  }

  useEffect(() => {
    wsRef.current = new BroadcastWebsocket<string>(id + "_STARTSTOP", setStartStopSignal);

    return () => {
      if (wsRef.current) {
        wsRef.current.ws.close(3500);
        wsRef.current = null;
      }
    };
  }, [id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.src = `/jepoardy/video/${encodeURIComponent(question.question)}`;
    video.volume = Math.min(1, Math.max(0, buzzerVolume / 100));

    const onEnded = () => {
      video.currentTime = 0;
    };

    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [question.question]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (startStopSignal === "START") {
      void video.play();
    }
    if (startStopSignal === "STOP") {
      video.pause();
    }
    if (startStopSignal === "CLEAR") {
      video.pause();
      video.currentTime = 0;
    }
  }, [startStopSignal]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
  }, [buzzerVolume]);

  return (
    <div
      className={
        "jp-question-video " + (question.state === "INVISIBLE" ? "jp-question-INVISIBLE__" : "")
      }
    >
      <video ref={videoRef} playsInline preload="auto" />
    </div>
  );
}

export default VideoQuestion;
