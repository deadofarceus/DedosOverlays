import { useState, useEffect } from "react";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { buzzer, preloadImages, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { COMBINATIONS, STARTGAMESTATE } from "./AIcController";
import { Button, Col, Container } from "react-bootstrap";
import AICombinationOverlay from "./AICombinationOverlay";
import Buzzer from "../../util/Buzzer";

let ws: GameshowWebsocket<AICombGameState>;

function AIcTeilnehmer() {
  document.body.className = "noOBS";

  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const userName = query.get("name") ?? "";

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

  return (
    <Container className="AIcTeilnehmerCon w-100 centerC">
      <h1 className="blackOutline AICUsername">{userName}</h1>
      <AICombinationOverlay combination={data.combination} />
      {userName && (
        <Button variant="danger" className="buzzerButton blackOutline" onClick={handleBuzzer}>
          BUZZER
        </Button>
      )}
      {/** Buzzer sound einstellen können mit schieberegler */}
      <Col className="centerC AIcBuzzerQueue teilnehmerBuzzerQueue">
        <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
        <div className="buzzerQueueScroll teilnehmerBuzzerQueueScroll">
          {buzzerQueue.map((buzzer, index) => (
            <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} clear={() => {}} />
          ))}
        </div>
      </Col>
    </Container>
  );
}

export default AIcTeilnehmer;
