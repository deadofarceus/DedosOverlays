import { useEffect, useState } from "react";
import { useQuery } from "../../types/UsefulFunctions";
import { PCTurnierWebsocket } from "../../types/WebsocketTypes";
import { BLANKDATA, PCEvent, PCPlayer } from "../../types/PCTurnierTypes";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { PlayerDisplayOther } from "./PlayerDisplay";

let ws: PCTurnierWebsocket;

function ModAnsicht() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [data, setData] = useState<PCEvent>(BLANKDATA);
  const [p, setP] = useState<string>("");

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new PCTurnierWebsocket(id, setData);
    }
  }, [query]);
  return (
    <Container className="centerC PCMOD textMitRand">
      <h1 className="headline">MOD Ansicht</h1>
      <Button
        size="lg"
        variant="success"
        id="button-addon2"
        className="updateOverlay"
        onClick={() => ws.sendData(data)}
      >
        UPDATE OVERLAY
      </Button>
      <Col className="centerC">
        <h3>Add Player:</h3>
        <InputGroup className="mb-3" id="linkCol">
          <Form.Control
            type="text"
            value={p}
            aria-describedby="basic-addon2"
            className="PlayerInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setP(e.target.value)
            }
          />
          <Button
            variant="success"
            id="button-addon2"
            disabled={p === ""}
            onClick={() => {
              data.contenders.push(new PCPlayer(p, 0));
              setData(data);
              setP("");
            }}
          >
            ADD PLAYER
          </Button>
        </InputGroup>
        <Col className="centerC textMitRand contendersContainer">
          {data.contenders.map((player: PCPlayer, index: number) => (
            <Row className="w-100" md="auto">
              <PlayerDisplayOther
                key={index}
                points={player.points}
                name={player.name}
                rank={index + 1}
              />
              <Col className="centerC" md="3">
                <Button
                  key={index * 32 + 1}
                  variant="success"
                  onClick={() => {
                    data.contenders[index].points += 1;
                    setData(new PCEvent("", data.contenders));
                  }}
                >
                  +1
                </Button>
                <Button
                  key={index * 32 + 2}
                  variant="warning"
                  onClick={() => {
                    data.contenders[index].points -= 1;
                    setData(new PCEvent("", data.contenders));
                  }}
                >
                  -1
                </Button>
                <Button
                  key={index * 32 + 3}
                  variant="danger"
                  onClick={() => {
                    data.contenders.splice(index, 1);
                    setData(new PCEvent("", data.contenders));
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Col>
    </Container>
  );
}

export default ModAnsicht;
