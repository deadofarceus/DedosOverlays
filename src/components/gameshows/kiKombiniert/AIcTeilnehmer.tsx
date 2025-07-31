import { useState, useEffect } from "react";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { AICombineWebsocket } from "../../../types/WebsocketTypes";
import { STARTGAMESTATE } from "./AIcController";
import { Button, Container, Form } from "react-bootstrap";
import AICombination from "./AICombination";

let ws: AICombineWebsocket;

function AIcTeilnehmer() {
  document.body.className = "noOBS";

  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");

  const addBuzzer = (buzzer: string) => {
    console.log(buzzer);

    if (buzzer === "CLEARBUZZERQUEUE") {
      setBuzzerQueue([]);
    } else if (!buzzerQueue.includes(buzzer)) {
      setBuzzerQueue([...buzzerQueue, buzzer]);
    }
  };

  const handleBuzzer = () => {
    if (userName !== "" && ws && !buzzerQueue.includes(userName)) {
      const id = query.get("id")!;
      buzzer(id, userName);
    }
  };

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new AICombineWebsocket(id, setData, addBuzzer);
    }
  }, [query]);

  return (
    <Container className="AIcTeilnehmerCon w-100 centerC">
      <AICombination combination={data.combination} />
      {userName && (
        <Button variant="danger" className="buzzerButton blackOutline" onClick={handleBuzzer}>
          BUZZER
        </Button>
      )}
      <Form.Control
        type="text"
        placeholder="Enter your user name"
        value={userName}
        className="buzzerUserInput"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
      />
    </Container>
  );
}

export default AIcTeilnehmer;
