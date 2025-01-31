import { Col, Container } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../../types/UsefulFunctions";
import { useState, useEffect } from "react";
import {
  PCEvent,
  BLANKDATA,
  PCPlayer,
} from "../../types/oldOrUnused/PCTurnierTypes";
import { PCTurnierWebsocket } from "../../types/WebsocketTypes";
import PlayerDisplay from "./PlayerDisplay";
import madGaming from "../../assets/MADGAMING.png";

let ws: PCTurnierWebsocket;

function Overlay() {
  const obs = isOBSBrowser();
  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }

  const query = useQuery();
  const [data, setData] = useState<PCEvent>(BLANKDATA);
  data.contenders.sort((a, b) => b.points - a.points);

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new PCTurnierWebsocket(id, setData);
    }
  }, [query]);

  const scroll = data.contenders.length < 9 ? "scrolling8" : "scrolling16";
  return (
    <Container className="PCOverlay">
      <div className="headlene centerC">
        <img className="madgaming" src={madGaming} alt="" />
        {/* <span className="rankingD">RANKING</span> */}
        <div className="descriptionD w-100 d-flex justify-content-between align-items-center">
          <span className="textMitRand">Rang</span>
          <span className="textMitRand">Punkte</span>
        </div>
      </div>

      <Col className={"statsContainer textMitRand " + scroll}>
        {data.contenders.map((player: PCPlayer, index: number) => (
          <PlayerDisplay
            key={index}
            points={player.points}
            name={player.name}
            rank={index + 1}
          />
        ))}
      </Col>
    </Container>
  );
}

export default Overlay;
