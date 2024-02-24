import { useEffect, useState } from "react";
import { DeathData, Player, PlayerInfo } from "../types/DeathTypes";
import { useQuery } from "../types/UsefulFunctions";
import { DeathCounterWebsocket } from "../types/WebsocketTypes";
import { Col, Container } from "react-bootstrap";
import "../styles/EldenRing.css";

let ws: DeathCounterWebsocket;

function DeathOverlay() {
  const oldDeaths = new DeathData([
    new Player("player1", 0),
    new Player("player2", 0),
  ]);
  const [deaths, setDeaths] = useState<DeathData>(oldDeaths);
  const query = useQuery();
  //   const dev = query.get("dev") === "true" ? true : false;

  useEffect(() => {
    const id = query.get("id");
    if (!ws && id) {
      ws = new DeathCounterWebsocket(id, deaths, setDeaths);
    }
  }, [deaths, query]);

  return (
    <Container className="eldenringdeath">
      <Col md="auto">
        {deaths.players.map((p) => (
          <PlayerDisplay
            key={p.id}
            playerName={p.playerName}
            deaths={p.deaths}
          />
        ))}
        <div
          className="timerdisplay"
          style={{
            backgroundImage: `url(../../deathbackground.png)`,
          }}
        >
          <Timer />
        </div>
      </Col>
    </Container>
  );
}

function PlayerDisplay({ playerName, deaths }: PlayerInfo) {
  const addDeath = (deathsNew: number) => {
    ws.changeDeaths(playerName, deathsNew);
  };

  const changeDeaths = () => {
    const deathsElement = document.getElementById("deaths" + playerName);
    const deathsValue = parseInt(
      deathsElement!.textContent!.replace("💀", "").trim()
    );
    addDeath(deathsValue);
  };

  const changePlayer = () => {
    const playerNameElement = document.getElementById(
      "playerName" + playerName
    );
    const playerNameValue = playerNameElement!.textContent!;
    ws.changeName(playerName, playerNameValue);
  };

  return (
    <div
      className="deathdisplay"
      style={{
        backgroundImage: `url(../../deathbackground.png)`,
      }}
    >
      <h1
        id={"playerName" + playerName}
        contentEditable={true}
        onBlur={changePlayer}
        className="nameDisplay"
      >
        {playerName}
      </h1>
      <h2
        className="nameDisplay"
        id={"deaths" + playerName}
        contentEditable={true}
        onBlur={changeDeaths}
        onContextMenu={(event) => {
          event.preventDefault();
          addDeath(deaths + 1);
        }}
      >
        {"💀 " + deaths}
      </h2>
    </div>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(
    Math.round((Date.now() - 1708814100000) / 1000)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(Math.round((Date.now() - 1708814100000) / 1000));
    }, 100);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format numbers to have leading zero if less than 10
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return (
    <h1 className="timerh1">
      {formattedHours}:{formattedMinutes}:{formattedSeconds}
    </h1>
  );
}

export default DeathOverlay;
