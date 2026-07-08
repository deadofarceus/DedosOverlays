import { useEffect, useMemo, useRef, useState } from "react";
import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";
import { useAudioSettings } from "../../../../../context/AudioSettingsContext";
import { useQuery } from "../../../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../../../types/WebsocketTypes";

function AudioQuestion({ question }: JepoardySingleQuestionProps) {
  const query = useQuery();
  const id = query.get("id");
  const { buzzerVolume } = useAudioSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wsRef = useRef<BroadcastWebsocket<string> | null>(null);
  const [startStopSignal, setStartStopSignal] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const bars = useMemo(() => {
    return Array.from({ length: 20 }, () => 30 + Math.round(Math.random() * 120));
  }, [question.question]);

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
    const src = `/jepoardy/audio/${encodeURIComponent(question.question)}`;
    const audio = new Audio(src);
    audio.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
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
    audio.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
  }, [buzzerVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (startStopSignal !== "START") return;

    const tryPlay = () => {
      void audio.play();
    };

    // If the audio isn't ready yet, wait for it once.
    if (audio.readyState < 3) {
      audio.addEventListener("canplay", tryPlay, { once: true });
      return () => {
        audio.removeEventListener("canplay", tryPlay);
      };
    }

    tryPlay();
  }, [startStopSignal, question.question]);

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
  const filledBars = Math.max(0, Math.min(bars.length, Math.floor(progress * bars.length)));

  return (
    <div className="jp-question-audio">
      {
        //**
        // hier das coole einfügen idee Spotify verlinkungs dingens */
      }

      {/* <div className="jp-question-audio-label" aria-hidden="true">
        Audio — {pct}%
      </div> */}
      <div
        className="jp-question-audio-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <img src="../../../jepoardy/Speaker.png" className="jp-question-audio-speaker" alt="" />
        <div className="jp-question-audio-eq" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              className={
                "jp-question-audio-eq-bar " +
                (i < filledBars ? "jp-question-audio-eq-bar--filled" : "")
              }
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        {/* <div className="jp-question-audio-bar-fill" style={{ width: `${pct}%` }} /> */}
      </div>
    </div>
  );
}

export default AudioQuestion;
