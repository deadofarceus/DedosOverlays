import { useState, useEffect } from "react";
import {
  Soullink,
  activeTrainers,
  createDefaultTrainers,
  DEFAULT_SOULLINK_SETTINGS,
  ensureTrainers,
  normalizeSettings,
} from "../../../types/Pokemon";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { Col, Container } from "react-bootstrap";
import Team from "./Team";

let ws: BroadcastWebsocket<Soullink>;

function SoullinkTeamOverlay() {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  const [soullink, setSoullink] = useState<Soullink>({
    id: id,
    routes: [],
    trainers: createDefaultTrainers(),
    settings: DEFAULT_SOULLINK_SETTINGS,
  });
  const routes = soullink.routes;
  const trainers = activeTrainers(soullink.trainers, soullink.settings.participants);
  useEffect(() => {
    if (id && !ws) {
      ws = new BroadcastWebsocket<Soullink>(id, setSoullink);
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/pokemon/soullink/${id}`);
      if (res.ok) {
        const data = await res.json();
        data.data.settings = normalizeSettings(data.data.settings);
        data.data.trainers = ensureTrainers(data.data.trainers);
        setSoullink(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, []);
  console.log(soullink);

  return (
    <Container className="soullinkTeamOverlayContainer">
      <Col className="teamCol">
        {trainers.map((t) => (
          <Team key={t.name} team={t.team} routes={routes} settings={soullink.settings} />
        ))}
      </Col>
    </Container>
  );
}

export default SoullinkTeamOverlay;
