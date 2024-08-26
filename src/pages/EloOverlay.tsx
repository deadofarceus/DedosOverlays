import { useEffect, useState } from "react";
import { Account, DEFAULTELOOVERLAY, QUEUETYPES } from "../types/LeagueTypes";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/EloOverlay.css";
import { EloWebsocket } from "../types/WebsocketTypes";
import { Container, Row } from "react-bootstrap";
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

  const nav = useNavigate();
  const { queueType } = useParams();
  const query = useQuery();
  const summonerName = query.get("name");
  const tag = query.get("tag");
  const key = query.get("key");

  const checkIngame = async (check: boolean) => {
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, 10000, "ingame");
    });
    const fetchPromise = fetch(
      "http://127.0.0.1:2999/liveclientdata/allgamedata"
    );
    Promise.race([timeoutPromise, fetchPromise])
      .then(() => checkIngame(true))
      .catch(() => {
        if (check) {
          console.log("call");

          fetch(
            `https://dedosserver.deno.dev/lol/requestUpdate/${summonerName}/${tag}?key=${key}`
          )
            .then((res) => res.text())
            .then((val) => console.log(val))
            .catch((error) => console.log(error));
        }
        setTimeout(() => checkIngame(false), 10000);
      });
  };

  useEffect(() => {
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
          "EUW1",
          setPlayerInfo
        );
      }

      checkIngame(false);
    }
  }, [key, nav, query, queueType, summonerName, tag]);

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
      <Row className="matchhistory" md="auto">
        {entry.lastMatches.map((match, index) => (
          <Champion
            key={match.id}
            mvp={match.mvp}
            index={index}
            championName={match.championName}
            win={match.win}
            length={entry.lastMatches.length}
          />
        ))}
      </Row>
    </Container>
  );
}

export default EloOverlay;
