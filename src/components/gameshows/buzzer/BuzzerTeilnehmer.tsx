import { useState, useEffect } from "react";
import { BuzzerGameState } from "../../../types/gameshows/Buzzer";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { Button, Col, Form } from "react-bootstrap";
import Buzzer from "../../util/Buzzer";
import "../../../styles/gameshows/Buzzer.css";

let ws: GameshowWebsocket<BuzzerGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

const STARTGAMESTATE: BuzzerGameState = {
  players: [{ name: "Teilnehmer1", points: 0, buzzed: false }],
  buzzerQueue: [],
};

function BuzzerTeilnehmer() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [data, setData] = useState<BuzzerGameState>(STARTGAMESTATE);
  const [volume, setVolume] = useState<number>(10);

  console.log(data);

  const userName = query.get("name") ?? "";

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

  const handleBuzzer = () => {
    if (userName !== "" && ws && !buzzerQueue.includes(userName)) {
      const id = query.get("id")!;
      buzzer(id, userName);
    }
  };

  return (
    <div className="buzzer-containerTeil">
      {userName && (
        <div className="centerC" style={{ width: "70%" }}>
          <Button variant="danger" className="buzzerButton blackOutline" onClick={handleBuzzer}>
            BUZZER
          </Button>
          {/* {data.players.map((player, index) => (
            <PlayerInfos key={index} player={player} />
          ))} */}
        </div>
      )}
      <Col className="centerC buzzer-queue">
        <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
        <div className="buzzerQueueScroll">
          {buzzerQueue.map((buzzer, index) => (
            <div>
              <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} clear={() => {}} />
            </div>
          ))}
        </div>
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

export default BuzzerTeilnehmer;
