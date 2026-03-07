import { useEffect, useState } from "react";
import { clearBuzzer, clearOneBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { Button, Col, Form } from "react-bootstrap";
import Buzzer from "../../util/Buzzer";
import "../../../styles/gameshows/Buzzer.css";
import { BuzzerGameState, Player } from "../../../types/gameshows/Buzzer";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import PlayerSettings from "./PlayerSettings";

let ws: GameshowWebsocket<BuzzerGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

const STARTGAMESTATE: BuzzerGameState = {
  players: [{ name: "Teilnehmer1", points: 0, buzzed: false }],
  buzzerQueue: [],
};

function BuzzerController() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [data, setData] = useState<BuzzerGameState>(STARTGAMESTATE);
  const [volume, setVolume] = useState<number>(10);

  useEffect(() => {
    const id = query.get("id");
    if (id && !ws) {
      ws = new GameshowWebsocket<BuzzerGameState>(id, setData, addBuzzer);

      const fetchData = async () => {
        const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
        if (res.ok) {
          const data = await res.json();
          setData(data.data);
        } else {
          console.log(res.statusText);
        }
      };

      fetchData();
    }
  }, [query]);

  useEffect(() => {
    audio.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (buzzer.startsWith("CLEAR_")) {
        const toRemove = buzzer.split("_")[1];
        return prevQueue.filter((b) => b !== toRemove);
      } else if (!prevQueue.includes(buzzer)) {
        if (prevQueue.length === 0) {
          audio.play();
        }
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

  const handleNewPlayer = () => {
    const newPlayers = [...data.players];
    newPlayers.push({ name: "Teilnehmer" + (newPlayers.length + 1), points: 0, buzzed: false });
    sendData({ ...data, players: newPlayers });
  };

  const handleRemovePlayer = (id: number) => {
    const newPlayers = [...data.players];
    newPlayers.splice(id, 1);
    sendData({ ...data, players: newPlayers });
  };

  const handleChangePlayer = (id: number, player: Player) => {
    const newPlayers = [...data.players];
    newPlayers[id] = player;
    sendData({ ...data, players: newPlayers });
  };

  const sendData = (newData: BuzzerGameState) => {
    if (!ws) return;
    ws.sendData(newData);
  };

  return (
    <div className="buzzer-container">
      <Col className="buzzer-teilnehmer centerC">
        {data.players.map((player, index) => (
          <PlayerSettings
            key={index}
            id={index}
            player={player}
            handleChangePlayer={handleChangePlayer}
            handleRemovePlayer={handleRemovePlayer}
          />
        ))}
        <Button onClick={handleNewPlayer} variant="success">
          NEW PLAYER
        </Button>
      </Col>
      <Col className="centerC buzzer-queue">
        <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
        <div className="buzzerQueueScroll">
          {buzzerQueue.map((buzzer, index) => (
            <div>
              <Buzzer
                key={index}
                queueSlot={index + 1}
                buzzer={buzzer}
                clear={handleClearOneBuzzer}
              />
            </div>
          ))}
        </div>
        <Button
          variant="danger"
          className="clearBuzzer blackOutline"
          onClick={() => handleClearBuzzer()}
        >
          Clear Buzzer
        </Button>
      </Col>
      <div className="buzzerSoundSlider">
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

export default BuzzerController;
