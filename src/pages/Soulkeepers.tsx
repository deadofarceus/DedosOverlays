import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import { Button, Col, Container } from "react-bootstrap";
import "../styles/Soulkeepers.css";
import { BroadcastWebsocket } from "../types/WebsocketTypes";
import { useEffect } from "react";
import { ModEvent } from "../types/BackendEvents";
import { useParams } from "react-router-dom";

let ws: BroadcastWebsocket<string>;

function Soulkeepers() {
  const isObs = isOBSBrowser();

  if (isObs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }

  const query = useQuery();

  const hideProgressBar = query.get("hideProgressBar")
    ? "&hideProgressBar"
    : "";
  const hideLevelsWithNoPoints = query.get("hideLevelsWithNoPoints")
    ? "&hideLevelsWithNoPoints"
    : "";
  const sheetId = query.get("sheetId") || "";
  const { website } = useParams();

  const streamerId = query.get("streamerId") || "";

  useEffect(() => {
    if (!ws && streamerId) {
      ws = new BroadcastWebsocket(streamerId, (data) => {
        //play sound from ../sounds/Rohan.m4a
        new Audio("../sounds/Rohan.m4a").play();
        console.log(data);
      });
    }
  }, [streamerId]);

  return isObs ? (
    <div className="obsSoulkeepersContainer">
      <iframe
        src={`https://${website}.cloudfront.net/?sheetId=${sheetId}${hideProgressBar}${hideLevelsWithNoPoints}`}
        allowTransparency={true}
        className="w-100 h-100 skIframe"
      ></iframe>
    </div>
  ) : (
    <Container className="soulkeepersContainer">
      <Col className="centerC">
        <Button
          className="skButton"
          variant="success"
          onClick={() => {
            ws.sendEvent(
              new ModEvent(streamerId, "SoulkeepersKanone", "testKanone")
            );
          }}
        >
          Sound Test
        </Button>
        <Button
          className="skButton"
          variant="danger"
          onClick={() => {
            // Browser confirmation window
            if (confirm("Ist der Streamer wirklich gestorben?")) {
              ws.sendEvent(
                new ModEvent(streamerId, "SoulkeepersKanone", "tot")
              );
            }
          }}
        >
          Streamer gestorben
        </Button>
      </Col>
    </Container>
  );
}

export default Soulkeepers;
