import { useEffect, useRef, useState } from "react";
import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";
import { useQuery } from "../../../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../../../types/WebsocketTypes";

let ws: BroadcastWebsocket<string>;

function AudioQuestion({ question }: JepoardySingleQuestionProps) {
  const query = useQuery();
  const id = query.get("id");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [startStopSignal, setStartStopSignal] = useState<string>("");
  const [progress, setProgress] = useState(0);

  if (!id) {
    return <></>;
  }

  useEffect(() => {
    if (!ws) {
      ws = new BroadcastWebsocket<string>(id + "_STARTSTOP", setStartStopSignal);
    }
  }, [id]);

  useEffect(() => {
    const src = `/jepoardy/audio/${encodeURIComponent(question.question)}`;
    const audio = new Audio(src);
    audioRef.current = audio;

    const updateProgress = () => {
      const d = audio.duration;
      if (d > 0 && Number.isFinite(d)) {
        setProgress(audio.currentTime / d);
      }
    };

    const onEnded = () => setProgress(1);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
      setProgress(0);
    };
  }, [question.question]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (startStopSignal === "START") {
      void audio.play();
    }
    if (startStopSignal === "STOP") {
      audio.pause();
    }
    if (startStopSignal === "CLEAR") {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
    }
  }, [startStopSignal]);

  const pct = Math.round(progress * 100);

  return (
    <div className="jp-question-audio">
      <div className="jp-question-audio-label" aria-hidden="true">
        Audio — {pct}%
      </div>
      <div
        className="jp-question-audio-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="jp-question-audio-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default AudioQuestion;
