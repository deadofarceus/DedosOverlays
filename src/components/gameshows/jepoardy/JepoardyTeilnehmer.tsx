import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { ModEvent } from "../../../types/BackendEvents";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import JepoardyBoard from "./board/JepoardyBoard";
import { Button, Form } from "react-bootstrap";

let ws: GameshowWebsocket<JepoardyGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

function JepoardyTeilnehmer() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<JepoardyGameState>(TESTGamestate);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [volume, setVolume] = useState<number>(10);

  const query = useQuery();
  const id = query.get("id");
  const player = gamestate.players.find((p) => p.name === query.get("name"));
  if (!player || !id) {
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

  useEffect(() => {
    audio.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

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

  const currentPlayer =
    buzzerQueue.length === 0
      ? gamestate.players[gamestate.currentPlayer]
      : gamestate.players.find((p) => p.name === buzzerQueue[0])!;

  const playerName = player.name;

  const question = gamestate.currentQuestion;
  const buzzerShowing = gamestate.state === "QUESTION" && !question.finished;

  const buzzerPressable =
    !question.buzzedPlayers.map((p) => p.name).includes(playerName) &&
    question.buzzedPlayers.length > 0 &&
    buzzerQueue.length === 0 &&
    question.state === "ACTIVE";

  const handleBuzzer = () => {
    if (!buzzerShowing) {
      return;
    }

    if (!buzzerPressable) {
      return;
    }

    const id = query.get("id")!;
    buzzer(id, playerName);
  };

  return (
    <div className="jp-controller">
      <div style={{ height: "30px" }}></div>
      <JepoardyBoard
        gamestate={gamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={() => {}}
        clearOneBuzzer={() => {}}
      />
      {/* <BuzzerQueue
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      /> */}

      <h1 className="jp-ownPlayerName blackOutline">{playerName}</h1>

      <div className="centerR jp-playerPointsTNDiv">
        {gamestate.players.map((player, index) => (
          <div
            key={index}
            className={
              "jp-playerPointsTN " + (player.name === currentPlayer.name ? "jp-ichbindran" : "")
            }
            id={""}
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>

      {buzzerShowing && (
        <div className="centerC" style={{ width: "70%" }}>
          <Button
            variant="danger"
            className={
              "buzzerButton blackOutline " + (buzzerPressable ? "" : "buzzerButtonDisabled")
            }
            onClick={handleBuzzer}
          >
            BUZZER
          </Button>
        </div>
      )}

      <div className="buzzerSoundSlider">
        {/** das auch bei controller ALLE SOUNDS mit der selben Lautstärke */}
        <span aria-label="Sound" title="Sound">
          🔊
        </span>
        <Form.Range
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value))}
          aria-label="Buzzer Lautstärke"
        />
      </div>
    </div>
  );
}

export default JepoardyTeilnehmer;
