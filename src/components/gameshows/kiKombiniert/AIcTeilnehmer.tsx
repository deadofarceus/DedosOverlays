import { useState, useEffect } from "react";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { buzzer, preloadImages, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { COMBINATIONS, STARTGAMESTATE } from "./AIcController";
import { Button, Col, Container, Form } from "react-bootstrap";
import AICombinationOverlay from "./AICombinationOverlay";
import Buzzer from "../../util/Buzzer";

let ws: GameshowWebsocket<AICombGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

function AIcTeilnehmer() {
  document.body.className = "noOBS";

  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [volume, setVolume] = useState<number>(10);

  const userName = query.get("name") ?? "";

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

  useEffect(() => {
    const id = query.get("id");
    if (id && !ws) {
      ws = new GameshowWebsocket<AICombGameState>(id, setData, addBuzzer);
      preloadImages(
        COMBINATIONS.map((combination) => "../../AICombine/" + combination.left + ".png").concat(
          COMBINATIONS.map((combination) => "../../AICombine/" + combination.right + ".png").concat(
            COMBINATIONS.map((combination) => "../../AICombine/" + combination.combined + ".png")
          )
        )
      );
    }

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
  }, [query]);

  useEffect(() => {
    audio.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

  return (
    <Container className="AIcTeilnehmerCon w-100 centerC">
      <h1 className="blackOutline AICUsername">{userName}</h1>
      <AICombinationOverlay combination={data.combination} />
      {userName && (
        <Button variant="danger" className="buzzerButton blackOutline" onClick={handleBuzzer}>
          BUZZER
        </Button>
      )}
      <Col className="centerC AIcBuzzerQueue teilnehmerBuzzerQueue">
        <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
        <div className="buzzerQueueScroll teilnehmerBuzzerQueueScroll">
          {buzzerQueue.map((buzzer, index) => (
            <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} clear={() => {}} />
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
    </Container>
  );
}

export default AIcTeilnehmer;
