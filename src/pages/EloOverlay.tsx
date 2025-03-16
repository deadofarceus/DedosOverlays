import { useEffect, useState } from "react";
import { Account, DEFAULTELOOVERLAY, QUEUETYPES } from "../types/LeagueTypes";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/EloOverlay.css";
import { EloWebsocket } from "../types/WebsocketTypes";
import { Button, Container } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import EloInfo from "../components/league/EloInfo";
import Matchhistory from "../components/league/Matchhistory";

let ws: EloWebsocket;

function EloOverlay() {
  const query = useQuery();
  const obs = isOBSBrowser() || query.get("obs") === "true";

  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }
  const [playerInfo, setPlayerInfo] = useState<Account>(
    DEFAULTELOOVERLAY as Account
  );

  const [lastClickTime, setLastClickTime] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= 15 * 60 * 1000) {
      //   ws.requestUpdate();
      setLastClickTime(currentTime);
    }
  };

  const nav = useNavigate();
  const { queueType } = useParams();

  useEffect(() => {
    const summonerName = query.get("name");
    const tag = query.get("tag");
    const key = query.get("key");
    const region = query.get("region") || "EUW1";
    if (
      summonerName === null ||
      tag === null ||
      key === null ||
      (queueType !== "soloduo" && queueType !== "flex")
    ) {
      // Redirect to error page if any of the parameters is missing
      nav("/EloOverlay");
    } else {
      if (!ws) {
        ws = new EloWebsocket(
          summonerName,
          tag,
          key,
          queueType,
          region,
          setPlayerInfo
        );
        // fetch("https://127.0.0.1:2999/liveclientdata/allgamedata", {
        //   method: "HEAD",
        //   mode: "no-cors",
        // })
        //   .then(function (response) {
        //     return response;
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (e) {
        //     console.log(e);
        //   });
      }
    }
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastClickTime;
    if (timeElapsed < 15 * 60 * 1000) {
      setDisabled(true);
      const timer = setTimeout(() => {
        setDisabled(false);
      }, 15 * 60 * 1000 - timeElapsed);
      return () => clearTimeout(timer);
    } else {
      setDisabled(false);
    }
  }, [lastClickTime, nav, query, queueType]);

  const entry = playerInfo.leagueEntrys.find(
    (entry) => entry.queueId === QUEUETYPES.get(queueType!)!.queueId
  )!;

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center eloOverlayContainer"
      style={{ width: "1140px" }}
    >
      <EloInfo
        eloLP={entry.leaguePoints}
        eloDivision={entry.tier}
        eloRank={entry.rank}
        lpDiff={entry.combinedLP - entry.lpStart}
        gmBorder={entry.gmBorder}
        challBorder={entry.challBorder}
      />
      <Matchhistory entry={entry} />
      {!obs && (
        <Button size="lg" onClick={handleClick} disabled={disabled}>
          Request Update
        </Button>
      )}
    </Container>
  );
}

export default EloOverlay;
