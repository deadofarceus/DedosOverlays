import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { ModEvent } from "../../../types/BackendEvents";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { clearBuzzer, clearOneBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import JepoardyBoard from "./board/JepoardyBoard";
import BuzzerQueue from "./BuzzerQueue";

let ws: GameshowWebsocket<JepoardyGameState>;

function JepoardyTeilnehmer() {
  const [gamestate, setGamestate] = useState<JepoardyGameState>(TESTGamestate);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);

  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGameState>(id, setGamestate, addBuzzer);
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
      if (res.ok) {
        const data = await res.json();
        setGamestate(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, []);

  const sendState = (newState: JepoardyGameState) => {
    const event = new ModEvent(id, "persistantdata", newState);
    console.log(newState);
    ws.sendEvent(event);
  };

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (!prevQueue.includes(buzzer)) {
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const handleClearBuzzer = () => {
    clearBuzzer(query.get("id")!);
    setBuzzerQueue([]);
  };

  const handleClearOneBuzzer = (buzzer: string) => {
    clearOneBuzzer(query.get("id")!, buzzer);
  };

  return (
    <div className="jp-controller">
      <JepoardyBoard gamestate={gamestate} sendState={sendState} buzzerQueue={buzzerQueue} />
      <BuzzerQueue
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
    </div>
  );
}

export default JepoardyTeilnehmer;
