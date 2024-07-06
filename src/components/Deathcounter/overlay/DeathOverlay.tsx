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
  player.bosses.forEach((b) => {
    total += b.deaths.length - 1;
    if (
      b.deaths.includes(0) &&
      b.deaths.length - 1 > 0 &&
      b.name !== "Other Monsters or Heights"
    ) {
      total = -1;
    }
  });
  const current = player.bosses[player.currentBoss];
  let bossDeaths = current.deaths.length - 1;
  if (
    current.deaths.includes(0) &&
    bossDeaths > 0 &&
    current.name !== "Other Monsters or Heights"
  ) {
    bossDeaths = -1;
  }
  const longestWord = findLongestWordLength(current.name);
  return (
    <Container className="deathOverlayCon">
      <Col className="centerC">
        {longestWord < 11 && (
          <Row className="w-100">
            <span className="numOfDeaths blackOutline">💀 Total: {total}</span>
            <span className="numOfDeaths blackOutline">
              💀 {current.name}: {bossDeaths}
            </span>
          </Row>
        )}
        {longestWord > 10 && (
          <Col className="w-100 centerC">
            <span className="numOfDeaths blackOutline">💀 Total: {total}</span>
            <span className="numOfDeathsLong blackOutline">
              💀 {current.name}: {bossDeaths}
            </span>
          </Col>
        )}
        <GraphOverlay player={player} />
      </Col>
    </Container>
  );
}

function findLongestWordLength(str: string) {
  const words = str.split(" ");
  let longestLength = 0;
  for (const word of words) {
    if (word.length > longestLength) {
      longestLength = word.length;
    }
  }
  return longestLength;
}

export default DeathOverlay;
