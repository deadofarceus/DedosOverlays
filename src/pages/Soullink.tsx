import { useParams } from "react-router-dom";

import "../styles/Soullink.css";
import { Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BroadcastWebsocket } from "../types/WebsocketTypes";
import { useQuery } from "../types/UsefulFunctions";
let gamepadWS: BroadcastWebsocket<Key>;

interface Key {
  key: string;
  type: "down" | "up";
}

function Soullink() {
  document.body.className = "noOBS";
  const { channel } = useParams();
  const query = useQuery();
  const [lastKey, setLastKey] = useState<Key>({ key: "", type: "down" });
  let pressedKeys: string[] = [];

  const handle = (e: KeyboardEvent, type: "down" | "up") => {
    const key = e.key;

    if (type === "down" && !pressedKeys.includes(key)) {
      gamepadWS.sendData({ key: key, type: type });
      console.log("SENDING DOWN: " + key);
      pressedKeys.push(key);
    } else if (type === "up" && pressedKeys.includes(key)) {
      gamepadWS.sendData({ key: key, type: type });
      console.log("SENDING UP: " + key);
      pressedKeys = pressedKeys.filter((k) => k !== key);
    }
  };

  useEffect(() => {
    const id = query.get("id");
    if (gamepadWS || !id) return;
    gamepadWS = new BroadcastWebsocket(id, setLastKey);

    window.addEventListener("keydown", (e) => handle(e, "down"));
    window.addEventListener("keyup", (e) => handle(e, "up"));

    return () => {
      window.removeEventListener("keydown", (e) => handle(e, "down"));
      window.removeEventListener("keyup", (e) => handle(e, "up"));
    };
  }, []);

  return (
    <Container className="SoullinkContainer">
      <Col>
        <h1>Soullink - {channel}</h1>
        <div id="video-container">
          <iframe
            id="player"
            src="https://vdo.ninja/?view=sbM39yM"
            allow="autoplay"
            width="1280"
            height="720"
          ></iframe>
        </div>
        <h2>{lastKey.key === " " ? "Space" : lastKey.key.toUpperCase()}</h2>
      </Col>
    </Container>
  );
}

export default Soullink;
