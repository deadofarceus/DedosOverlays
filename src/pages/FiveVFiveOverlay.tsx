import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/FiveVFiveOverlay.css";
import { useQuery } from "../types/UsefulFunctions";
import { FiveVFiveWebsocket } from "../types/WebsocketTypes";
import { FiveVFiveEvent } from "../types/BackendEvents";
import { Team, VS } from "../types/FiveVFiveTypes";

let ws: FiveVFiveWebsocket;

function FiveVFiveOverlay() {
  const [data, setData] = useState<FiveVFiveEvent>(
    new FiveVFiveEvent(
      "",
      new Team("Rot", ["Dota2", "Smite", "Heroes of the Storm"]),
      new Team("Blau", [
        "Counter Strike 2",
        "Valorant",
        "Overwatch",
        "Rainbow6",
      ]),
      "League of Legends",
      "BestOf3",
      "0 : 0"
    )
  );

  const query = useQuery();
  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new FiveVFiveWebsocket(id, setData);
    }
  }, [query]);

  return (
    <Container className="FiveVFiveOverlayContainer">
      <Row className="alterduOpfer">
        <TeamD
          teamName={data.teamA.teamName}
          wonGames={data.teamA.wonGames}
        ></TeamD>
        <VSD
          currentGame={data.currentGame}
          bestof={data.bestof}
          standing={data.standing}
        ></VSD>
        <TeamD
          teamName={data.teamB.teamName}
          wonGames={data.teamB.wonGames}
        ></TeamD>
      </Row>
    </Container>
  );
}

function TeamD({ teamName, wonGames }: Team) {
  const color = teamName === "Rot" ? "#FF2222" : "#4876FF";
  return (
    <Col className="team5v5">
      <h1 style={{ color: color }}>{teamName}</h1>
      <Col className="wongames">
        {wonGames.map((game: string) => (
          <WonGameD gameName={game}></WonGameD>
        ))}
      </Col>
    </Col>
  );
}

function WonGameD({ gameName }: { gameName: string }) {
  return <h5 style={{ color: "#64ff64" }}>{gameName}</h5>;
}

function VSD({ currentGame, bestof, standing }: VS) {
  return (
    <Col className="VS5v5">
      <h1>VS</h1>
      <h2>{currentGame}</h2>
      <h4>{bestof}</h4>
      <h3>{standing}</h3>
    </Col>
  );
}

export default FiveVFiveOverlay;
