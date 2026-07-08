import { useState, useEffect, useRef } from "react";
import { JepoardyQuestionProps, Question } from "../../../../types/gameshows/Jepoardy";
import { useQuery } from "../../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../../types/WebsocketTypes";
import JepoardyBoardQuestion from "./JepoardyBoardQuestion";

const RANDOM_TICK_SOUND = "../../jepoardy/audio/tick1.mp3";
const RANDOM_FINISH_SOUND = "../../jepoardy/audio/finish2.mp3";

function playRandomizerStepSound(isLastTick: boolean) {
  const src = isLastTick ? RANDOM_FINISH_SOUND : RANDOM_TICK_SOUND;
  const audio = new Audio(src);
  audio.volume = 0.4;
  void audio.play().catch(() => {});
}

// Only Animation class no Logic
function JepoardyRandomQuestion({ questions, gamestate, sendState }: JepoardyQuestionProps) {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  const wsRef = useRef<BroadcastWebsocket<string> | null>(null);

  const [startStopSignal, setStartStopSignal] = useState<string>("WAITING");
  const [tickActiveIndex, setTickActiveIndex] = useState(0);
  let question: Question = questions[0];
  const needRandomQuestion = questions.length > 1;

  useEffect(() => {
    if (!needRandomQuestion) {
      return;
    }
    wsRef.current = new BroadcastWebsocket<string>(id + "_STARTSTOP", setStartStopSignal);

    return () => {
      if (wsRef.current) {
        wsRef.current.ws.close(3500);
        wsRef.current = null;
      }
    };
  }, [id]);

  useEffect(() => {
    if (!startStopSignal.startsWith("STARTRANDOM")) return;

    const ticks = Number(startStopSignal.split("_")[1]);
    const validTicks = Number.isFinite(ticks) && ticks > 0 ? Math.floor(ticks) : 0;
    const n = questions.length;
    if (validTicks < 1 || n < 1) return;

    let cancelled = false;
    let step = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const delayBeforeNextStep = (afterStep: number) => {
      const startMs = 32;
      const incrementMs = 14;
      const capMs = 900;
      return Math.min(capMs, startMs + (afterStep - 1) * incrementMs);
    };

    const advance = () => {
      if (cancelled) return;
      const isLastTick = step > validTicks - 2;
      playRandomizerStepSound(isLastTick);
      setTickActiveIndex(step % n);
      step += 1;
      if (step >= validTicks) return;
      timeoutId = setTimeout(advance, delayBeforeNextStep(step));
    };

    advance();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [startStopSignal, questions.length]);

  if (startStopSignal === "WAITING") {
    return (
      <div className="jp-question">
        <div className="jp-question-container">
          <JepoardyBoardQuestion
            questions={[question]}
            sendState={sendState}
            gamestate={gamestate}
          />
          <div className="jp-question-title">{question.category}</div>
          <div className="jp-question-randomizer">
            {questions.map((q, index) => (
              <div key={index} className="jp-randomThings">
                {q.info}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (startStopSignal.startsWith("STARTRANDOM")) {
    const n = questions.length;
    const activeMod = n > 0 ? tickActiveIndex % n : 0;

    return (
      <div className="jp-question">
        <div className="jp-question-container">
          <JepoardyBoardQuestion
            questions={[question]}
            sendState={sendState}
            gamestate={gamestate}
          />
          <div className="jp-question-title">{question.category}</div>
          <div className="jp-question-randomizer">
            {questions.map((q, index) => (
              <div
                key={index}
                className={`jp-randomThings${
                  index === activeMod ? " jp-randomThings--tick-active" : ""
                }`}
              >
                {q.info}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default JepoardyRandomQuestion;
