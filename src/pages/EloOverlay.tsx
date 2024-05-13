import { useEffect, useState } from "react";
import { Account, DEFAULTELOOVERLAY } from "../types/LeagueTypes";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/EloOverlay.css";
import { EloWebsocket } from "../types/WebsocketTypes";
import { Button, Container, Row } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import Champion from "../components/league/ChampionEO";
import EloInfo from "../components/league/EloInfo";

let ws: EloWebsocket;

function EloOverlay() {
  const obs = isOBSBrowser();
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
      ws.requestUpdate();
      setLastClickTime(currentTime);
    }
  };

  const nav = useNavigate();
  const { queueType } = useParams();
  const query = useQuery();

  useEffect(() => {
    const summonerName = query.get("name");
    const tag = query.get("tag");
    const key = query.get("key");
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
        ws = new EloWebsocket(summonerName, tag, key, queueType, setPlayerInfo);
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

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center eloOverlayContainer"
      style={{ width: "1140px" }}
    >
      <EloInfo
        eloLP={playerInfo.leaguePoints}
        eloDivision={playerInfo.tier}
        eloRank={playerInfo.rank}
        lpDiff={playerInfo.combinedLP - playerInfo.lpStart}
        gmBorder={playerInfo.gmBorder}
        challBorder={playerInfo.challBorder}
      />
      <Row className="matchhistory" md="auto">
        {playerInfo.lastThree.map((match, index) => (
          <Champion
            key={match.id}
            mvp={match.mvp}
            index={index}
            championName={match.championName}
            win={match.win}
            length={playerInfo.lastThree.length}
          />
        ))}
      </Row>
      {!obs && (
        <Button size="lg" onClick={handleClick} disabled={disabled}>
          Request Update
        </Button>
      )}
    </Container>
  );
}

export default EloOverlay;
