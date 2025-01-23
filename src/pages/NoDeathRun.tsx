import { Container } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import NoDeathRunControls from "../components/nodeathrun/NoDeathRunControls";
import { useEffect, useState } from "react";
import NoDeathRunGames from "../components/nodeathrun/NoDeathRunGames";
import "../styles/NoDeathRun.css";
import { BroadcastWebsocket } from "../types/WebsocketTypes";

export interface NoDeathRunGame {
  name: string;
  status: string;
  active: boolean;
}

let ws: BroadcastWebsocket<NoDeathRunGame[]>;

function NoDeathRun() {
  const query = useQuery();
  const obs = isOBSBrowser() || query.get("obs") === "true";

  const [games, setGames] = useState<NoDeathRunGame[]>([
    { name: "ER", status: "PLAYING", active: true },
    { name: "I", status: "OPEN", active: true },
    { name: "II", status: "OPEN", active: true },
    { name: "III", status: "OPEN", active: true },
    { name: "DS I", status: "OPEN", active: true },
    { name: "DS II", status: "OPEN", active: true },
    { name: "DS III", status: "OPEN", active: true },
    { name: "SK", status: "OPEN", active: true },
    { name: "BB", status: "OPEN", active: true },
    { name: "DS", status: "OPEN", active: true },
  ]);

  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }

  if (!obs && ws) {
    ws.sendData(games);
  }

  useEffect(() => {
    const id = query.get("id");
    if (!ws && id) {
      if (obs) {
        ws = new BroadcastWebsocket<NoDeathRunGame[]>(id, setGames);
      } else {
        ws = new BroadcastWebsocket<NoDeathRunGame[]>(id);
      }
    }
  }, []);

  console.log(games);

  return (
    <Container>
      {!obs && <NoDeathRunControls games={games} callback={setGames} />}
      <NoDeathRunGames games={games} />
    </Container>
  );
}

export default NoDeathRun;
