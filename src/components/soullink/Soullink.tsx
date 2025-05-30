import "../../styles/Soullink.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PokemonWebsocket } from "../../types/WebsocketTypes";
import { PokemonEvent } from "../../types/Pokemon";
let gamepadWS: PokemonWebsocket;

function Soullink() {
  document.body.className = "noOBS";
  const [authToken, setToken] = useState<string>("");
  const [message, handleMessage] = useState<PokemonEvent>({
    type: "auth",
    data: "",
    token: "",
  });
  const [vdoLink, setVdoLink] = useState<string>("nolink");
  let pressedKeys: string[] = [];

  useEffect(() => {
    if (authToken !== "") {
      return;
    }

    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        console.log("TOKEN: " + token);
        window.location.hash = "";
        setToken(token);
      } else {
        console.log("NO TOKEN");
        window.location.href = "https://arceus-overlays.netlify.app/Pokemon/Soullink/login";
      }
    } else {
      console.log("NO HASH");
      window.location.href = "https://arceus-overlays.netlify.app/Pokemon/Soullink/login";
    }
  }, [authToken]);

  const handle = (e: KeyboardEvent, type: "down" | "up") => {
    const key = e.key;

    if (type === "down" && !pressedKeys.includes(key)) {
      const wasdenn = {
        type: "key",
        data: { key: key, type: type },
        token: authToken,
      } as PokemonEvent;
      console.log(wasdenn);

      gamepadWS.sendData(wasdenn);
      console.log("SENDING DOWN: " + key);
      pressedKeys.push(key);
    } else if (type === "up" && pressedKeys.includes(key)) {
      gamepadWS.sendData({
        type: "key",
        data: { key: key.toLowerCase(), type: type },
        token: authToken,
      });
      console.log("SENDING UP: " + key);
      pressedKeys = pressedKeys.filter((k) => k !== key);
    }
  };

  useEffect(() => {
    if (gamepadWS || authToken === "") return;
    gamepadWS = new PokemonWebsocket("pokemonRecieverClient", authToken, handleMessage);

    window.addEventListener("keydown", (e) => handle(e, "down"));
    window.addEventListener("keyup", (e) => handle(e, "up"));

    return () => {
      window.removeEventListener("keydown", (e) => handle(e, "down"));
      window.removeEventListener("keyup", (e) => handle(e, "up"));
    };
  }, [authToken]);

  switch (message.type) {
    case "auth":
      if (message.data === "declined") {
        gamepadWS.ws.close();
        window.location.href = "https://arceus-overlays.netlify.app/Pokemon/Soullink/login";
      }
      break;
    case "vdo":
      if (vdoLink === "nolink") {
        console.log("VDO", message);
        setVdoLink(message.data);
      }
      break;
    case "key":
      console.log("Key pressed: " + message.data);
      break;
    default:
      console.log("default");
      break;
  }

  return (
    <Container className="SoullinkContainer">
      <Row className="centerR w-100">
        <Col className="centerC pokemon-side-text">
          <h1>Regeln</h1>
          <p>
            {
              "- Nur das erste Pokemon pro Bereich darf gefangen werden. Dieses ist gelinked mit dem Pokemon vom Partner im selben Bereich"
            }
            <br />
            {"- Shinys immer gültig zu fangen Joker für den anderen"}
            <br />
            {"- Pokemon ist tot -> Partner Pokemon stirbt darf aber im Fight noch benutzt werden"}
            <br />
            {"- Gelinkte Pokemon müssen immer entweder im Team oder auf dem PC liegen"}
            <br />
            {"- VM-Sklave fangen immer gültig"}
            <br />
            {"- Heal gegen AP Taktik verboten"}
            <br />
            {"- Bei Regelfragen haben Arceus, Evenso und Chaos11377 immer das letzte Wort"}
          </p>
        </Col>
        <div id="video-container" className="centerC">
          {vdoLink !== "nolink" && vdoLink !== "nolinkSet" && (
            <iframe id="player" src={vdoLink} allow="autoplay" width="1280" height="720"></iframe>
          )}
        </div>
        <Col className="centerC pokemon-side-text">
          <h1>Controls</h1>
          <p>
            {" Steuerkreuz: W, A, S, D"}
            <br />
            {" A Knopf: E"}
            <br />
            {" B Knopf: Spacebar"}
            <br />
            {" X Knopf: X"}
            <br />
            {" Y Knopf: Y"}
            <br />
            {" Turboschnell Umschalt: P"}
            <br />
            {" Schneller machen: arrow up"}
            <br />
            {" Langsamer machen: arrow down"}
            <br />
          </p>
          <h4>Funktionieren deine Eingaben nicht?</h4>
          <h3>Klick irgendwo hin Hauptsache nicht auf den DS Bildschirm oder einfach</h3>
          <Button variant="danger">hier</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Soullink;
