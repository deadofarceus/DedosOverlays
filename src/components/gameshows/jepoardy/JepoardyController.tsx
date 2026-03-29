import { useEffect, useState } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import UserControls from "./admin/UserControls";
import JepoardyBoard from "./board/JepoardyBoard";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { clearBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import BoardControls from "./board/Boardcontrols";
import BuzzerQueue from "./BuzzerQueue";

let ws: GameshowWebsocket<JepoardyGameState>;

function JepoardyController() {
  document.body.className = "noOBS";
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
    ws.sendData(newState);
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

  return (
    <div className="jp-controller">
      <JepoardyBoard gamestate={gamestate} sendState={sendState} />
      <BoardControls gamestate={gamestate} sendState={sendState} />
      <BuzzerQueue clearBuzzer={handleClearBuzzer} buzzerQueue={buzzerQueue} />
      <UserControls gamestate={gamestate} sendState={sendState} />
    </div>
  );
}

export default JepoardyController;
