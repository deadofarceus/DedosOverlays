import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Player, DEFAULTPLAYER } from "../../../types/DeathcounterTypes";
import { useQuery } from "../../../types/UsefulFunctions";
import { DeathCounterWebsocket } from "../../../types/WebsocketTypes";
import GraphOverlay from "./GraphOverlay";

let ws: DeathCounterWebsocket;

function DeathOverlay() {
  const [player, setPlayer] = useState<Player>(DEFAULTPLAYER);
  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    if (!ws && id) {
      ws = new DeathCounterWebsocket(id, setPlayer, false);
    }
  }, [id, query]);

  let total = 0;
  player.bosses.forEach((b) => (total += b.deaths.length - 1));
  const current = player.bosses[player.currentBoss];
  return (
    <Container className="deathOverlayCon">
      <Col className="centerC">
        <Row className="w-100">
          <span className="numOfDeaths blackOutline">💀 Gesamt: {total}</span>
          <span className="numOfDeaths blackOutline">
            💀 {current.name}: {current.deaths.length - 1}
          </span>
        </Row>
        <GraphOverlay player={player} tries={player.triesInGraph} />
      </Col>
    </Container>
  );
}

export default DeathOverlay;
