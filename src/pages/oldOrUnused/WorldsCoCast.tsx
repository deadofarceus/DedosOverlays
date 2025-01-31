import { Col, Container } from "react-bootstrap";
import { CoStreamCardProps } from "../../types/oldOrUnused/CoStreamTypes";
import CoStreamCard from "../../components/league/CoStreams/CoStreamCard";
import "../../styles/oldOrUnused/CoStream.css";
import { isOBSBrowser, useQuery } from "../../types/UsefulFunctions";
import { useEffect, useState } from "react";
import { BroadcastWebsocket } from "../../types/WebsocketTypes";

let ws: BroadcastWebsocket<CoStreamCardProps[]>;

function WorldsCoCast() {
  const isObs = isOBSBrowser();
  if (isObs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }

  const [CoStreams, setCoStreams] = useState<CoStreamCardProps[]>([]);

  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new BroadcastWebsocket(id, setCoStreams);
    }
  }, [query]);

  return (
    <Container className="co-stream-container">
      <Col className="co-stream-col">
        <h1 className="m-4">Anstehende Co-Streams</h1>
        {CoStreams.map((item, index) => (
          <CoStreamCard key={index} date={item.date} matchups={item.matchups} />
        ))}
      </Col>
    </Container>
  );
}

export default WorldsCoCast;
