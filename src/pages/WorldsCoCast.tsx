import { Col, Container } from "react-bootstrap";
import { CoStreamCardProps } from "../types/CoStreamTypes";
import CoStreamCard from "../components/league/CoStreams/CoStreamCard";
import "../styles/CoStream.css";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import { useEffect, useState } from "react";
import { BroadcastWebsocket } from "../types/WebsocketTypes";

const test: CoStreamCardProps = {
  date: new Date("2024-09-25T14:00:00"),
  matchups: [
    {
      team1: "MDK",
      team2: "T1",
      format: "Bo3",
      standing: "0-0",
      logo1: "",
      logo2: "",
    },
  ],
};
const test2: CoStreamCardProps = {
  date: new Date("2024-09-26T14:00:00"),
  matchups: [
    {
      team1: "MDK",
      team2: "T1",
      format: "Bo3",
      standing: "0-0",
      logo1: "",
      logo2: "",
    },
    {
      team1: "FNC",
      team2: "HLE",
      format: "Bo3",
      standing: "0-0",
      logo1: "",
      logo2: "",
    },
  ],
};
const testArray: CoStreamCardProps[] = [test, test2];

let ws: BroadcastWebsocket<CoStreamCardProps[]>;

function WorldsCoCast() {
  const isObs = isOBSBrowser();
  if (isObs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }

  const [CoStreams, setCoStreams] = useState<CoStreamCardProps[]>(testArray);

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
