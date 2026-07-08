import { useEffect, useRef } from "react";
import { BroadcastWebsocket } from "../../../../types/WebsocketTypes";
import { useQuery } from "../../../../types/UsefulFunctions";
import { useState } from "react";

function BoardTimer() {
  const [time, setTime] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const query = useQuery();
  const id = query.get("id");

  const wsRef = useRef<BroadcastWebsocket<string> | null>(null);

  useEffect(() => {
    if (id && !wsRef.current) {
      wsRef.current = new BroadcastWebsocket<string>(id + "_TIMER", setTime);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.ws.close(3500);
        wsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const command = time.split("_")[0];
    const timeLeft = parseInt(time.split("_")[1]);

    if (intervalRef.current) clearInterval(intervalRef.current);
    

    if (command === "START" && timeLeft > 0) {
      setPercent(100);
      setIsRunning(true);
      const step = 100 / (timeLeft / 50); // alle 50ms ein Schritt
      intervalRef.current = setInterval(() => {
        setPercent((prev) => {
          const next = Math.max(0, prev - step);
          if (next <= 0) {clearInterval(intervalRef.current!);
            setTime("STOP_0");
          }
          return next;
        });
      }, 50);
    } else if (command === "STOP" || command === "RESET") {
      setPercent(0);
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [time]);

  return (
    <div className="jp-timer-loading-bar-wrapper" style={{ display: !isRunning ? "none" : "block"}}>
      <div
        className="jp-timer-loading-bar"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default BoardTimer