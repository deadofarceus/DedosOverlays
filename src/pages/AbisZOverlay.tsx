import { useEffect, useState } from "react";
import { AbisZWebsocket } from "../types/WebsocketTypes";
import { AbisZAccount, DEFAULTABISZ } from "../types/LeagueTypes";
import { Container } from "react-bootstrap";

let ws: AbisZWebsocket;

function AbisZOverlay() {
  const [account, setAccount] = useState<AbisZAccount>(DEFAULTABISZ);

  useEffect(() => {
    if (!ws) {
      ws = new AbisZWebsocket("id", setAccount);
    }
  }, []);

  const currentGroup = account.championGroups.find((g) => !g.group.won);

  return <Container></Container>;
}

export default AbisZOverlay;
