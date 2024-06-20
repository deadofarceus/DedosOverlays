import { Container, Row, Col } from "react-bootstrap";
import BossInfo from "../components/Deathcounter/BossInfo";
import ControlPanel from "../components/Deathcounter/ControlPanel";
import GraphBox from "../components/Deathcounter/GraphBox";
import ChangeBoss from "../components/Deathcounter/ChangeBoss";
import "../styles/Deathcounter.css";
import { DEFAULTPLAYER, Player } from "../types/DeathcounterTypes";
import { useEffect, useState } from "react";
import { useQuery } from "../types/UsefulFunctions";
import { DeathCounterWebsocket } from "../types/WebsocketTypes";

let ws: DeathCounterWebsocket;

function Deathcounter() {
  document.body.className = "noOBS";
  const [player, setPlayer] = useState<Player>(DEFAULTPLAYER);
  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    const savedPlayer = localStorage.getItem(id + "EldenRingDeathcounter");

    if (!ws && id) {
      ws = new DeathCounterWebsocket(id, setPlayer, true);
      if (savedPlayer) {
        setPlayer(JSON.parse(savedPlayer));
      } else {
        localStorage.setItem(
          id + "EldenRingDeathcounter",
          JSON.stringify(DEFAULTPLAYER)
        );
      }
    }
  }, [id, query]);

  if (ws && ws.ws.readyState === ws.ws.OPEN) {
    ws.sendData(player);
    localStorage.setItem(id + "EldenRingDeathcounter", JSON.stringify(player));

    console.log(
      "NEUER SAVE",
      JSON.parse(localStorage.getItem(id + "EldenRingDeathcounter")!)
    );
  }
  console.log(player);

  return (
    <Container className="DeathContainer w-100 centerC">
      <Row className="w-100">
        <ChangeBoss player={player} callback={setPlayer} />
        <Col className="centerC" xs={9}>
          <Row className="w-100 h-50">
            <BossInfo player={player} callback={setPlayer} />
            <ControlPanel player={player} callback={setPlayer} />
          </Row>
          <Row className="mt-3 w-100 h-50">
            <GraphBox player={player} callback={setPlayer} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Deathcounter;
