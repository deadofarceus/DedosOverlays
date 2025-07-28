import { AICombineWebsocket } from "../../../types/WebsocketTypes";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { useQuery } from "../../../types/UsefulFunctions";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { STARTGAMESTATE } from "./AIcController";
import VDOLinkStream from "../../util/VDOLinkStream";

let ws: AICombineWebsocket;

function AIcOverlay() {
  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);

  const addBuzzer = (_buzzer: string) => {};

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new AICombineWebsocket(id, setData, addBuzzer);
    }
  }, [query]);

  return (
    <Container className="AIcOverlayCon">
      {data.vdoNinjaLinks.map((link, index) => (
        <VDOLinkStream key={index} link={link} />
      ))}
    </Container>
  );
}

export default AIcOverlay;
