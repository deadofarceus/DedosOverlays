import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/FiveVFiveOverlay.css";
import { useQuery } from "../types/UsefulFunctions";
import { FiveVFiveWebsocket } from "../types/WebsocketTypes";
import { FiveVFiveEvent } from "../types/BackendEvents";
import { Game, Team, VS } from "../types/FiveVFiveTypes";

let ws: FiveVFiveWebsocket;

function FiveVFiveOverlay() {
  const [data, setData] = useState<FiveVFiveEvent>(
    new FiveVFiveEvent(
      "",
      new Team(
        "Rot",
        [
          //   new Game("Dota2", 1),
          //   new Game("Smite", 2),
          //   new Game("Heroes of the Storm", 1),
        ],
        0
      ),
      new Team(
        "Blau",
        [
          //   new Game("Counter Strike 2", 1),
          //   new Game("Valorant", 1),
          //   new Game("Overwatch", 1),
          //   new Game("Rainbow6", 1),
        ],
        0
      ),
      "Warte auf Beginn...",
      "",
      ""
      //   "League of Legends",
      //   "BestOf3",
      //   "1 : 0"
    )
  );

  const query = useQuery();
  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new FiveVFiveWebsocket(id, setData);
    }
  }, [query]);

  let pointsA = 0;
  data.teamA.wonGames.forEach((g) => (pointsA += g.points));
  let pointsB = 0;
  data.teamB.wonGames.forEach((g) => (pointsB += g.points));

  return (
    <Container className="FiveVFiveOverlayContainer">
      <Row className="alterduOpfer">
        <TeamD
          teamName={data.teamA.teamName}
          wonGames={data.teamA.wonGames}
          points={pointsA}
        ></TeamD>
        <VSD
          currentGame={data.currentGame}
          bestof={data.bestof}
          standing={data.standing}
        ></VSD>
        <TeamD
          teamName={data.teamB.teamName}
          wonGames={data.teamB.wonGames}
          points={pointsB}
        ></TeamD>
      </Row>
    </Container>
  );
}

function TeamD({ teamName, wonGames, points }: Team) {
  const color = teamName === "Rot" ? "#FF2222" : "#4876FF";
  return (
    <Col className="team5v5">
      <h1 style={{ color: color }}>{teamName + " " + points}</h1>
      <Col className="wongames">
        {wonGames.map((game: Game) => (
          <WonGameD gameName={game.gameName} points={game.points}></WonGameD>
        ))}
      </Col>
    </Col>
  );
}

function WonGameD({ gameName, points }: { gameName: string; points: number }) {
  return <h5 style={{ color: "#daffda" }}>{`(${points}) ${gameName}`}</h5>;
}

function VSD({ currentGame, bestof, standing }: VS) {
  return (
    <Col className="VS5v5">
      <h1>VS</h1>
      <h2>{currentGame}</h2>
      {bestof && (
        <Col className="currentGame">
          <h4>{bestof}</h4>
          <h3>{standing}</h3>
        </Col>
      )}
    </Col>
  );
}

export default FiveVFiveOverlay;
