import { useEffect, useState } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import UserControls from "./admin/UserControls";
import JepoardyBoard from "./board/JepoardyBoard";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { clearBuzzer, clearOneBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import BoardControls from "./board/Boardcontrols";
import { Form } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";

let ws: GameshowWebsocket<JepoardyGameState>;

function JepoardyController() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<JepoardyGameState>(TESTGamestate);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const { buzzerVolume, setBuzzerVolume } = useAudioSettings();

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
      } else if (buzzer.startsWith("CLEAR_")) {
        const toRemove = buzzer.split("_")[1];
        return prevQueue.filter((b) => b !== toRemove);
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

  const currentPlayer =
    buzzerQueue.length === 0
      ? gamestate.players[gamestate.currentPlayer]
      : gamestate.players.find((p) => p.name === buzzerQueue[0])!;

  return (
    <div className="jp-controller">
      <JepoardyBoard
        gamestate={gamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
      <div className="centerR jp-playerPointsTNDiv">
        {gamestate.players.map((player, index) => (
          <div
            key={index}
            className={
              "jp-playerPointsTN " + (player.name === currentPlayer.name ? "jp-ichbindran" : "")
            }
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>
      <BoardControls
        gamestate={gamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
      {/* <BuzzerQueue
        clearBuzzer={handleClearBuzzer}
        buzzerQueue={buzzerQueue}
        clearOneBuzzer={handleClearOneBuzzer}
      /> */}
      <UserControls
        gamestate={gamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
      <div className="buzzerSoundSlider">
        {/** das auch bei controller ALLE SOUNDS mit der selben Lautstärke */}
        <span aria-label="Sound" title="Sound">
          🔊
        </span>
        <Form.Range
          min={0}
          max={100}
          step={1}
          value={buzzerVolume}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBuzzerVolume(Number(e.target.value))
          }
          aria-label="Buzzer Lautstärke"
        />
      </div>
    </div>
  );
}

export default JepoardyController;
