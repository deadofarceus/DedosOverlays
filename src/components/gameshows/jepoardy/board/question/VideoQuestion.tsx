import { useEffect, useRef, useState } from "react";
import { JepoardyQuestionProps } from "../../../../../types/gameshows/Jepoardy";
import { useQuery } from "../../../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../../../types/WebsocketTypes";

let ws: BroadcastWebsocket<string>;

function VideoQuestion({ question }: JepoardyQuestionProps) {
  const query = useQuery();
  const id = query.get("id");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [startStopSignal, setStartStopSignal] = useState<string>("");

  if (!id) {
    return <></>;
  }

  useEffect(() => {
    if (!ws) {
      ws = new BroadcastWebsocket<string>(id + "_STARTSTOP", setStartStopSignal);
    }
  }, [id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.src = `/jepoardy/video/${encodeURIComponent(question.question)}`;

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

  return (
    <div
      className={
        "jp-question-video " + (question.state === "INVISIBLE" ? "jp-question-INVISIBLE" : "")
      }
    >
      <video ref={videoRef} playsInline preload="auto" />
    </div>
  );
}

export default VideoQuestion;
