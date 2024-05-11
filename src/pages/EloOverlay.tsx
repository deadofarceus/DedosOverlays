import { useEffect, useState } from "react";
import {
  Account,
  AccountElo,
  ChampionMatchHistory,
} from "../types/LeagueTypes";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/EloOverlay.css";
import { EloWebsocket } from "../types/WebsocketTypes";
import { Col, Container, Row } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";

let ws: EloWebsocket;

function EloOverlay() {
  if (isOBSBrowser()) {
    document.body.style.backgroundColor = "transparent";
  } else {
    document.body.style.backgroundColor = "black";
  }
  const oldAccount: object = {
    summonerId: "",
    name: "",
    hashtag: "",
    puuid: "",
    tier: "UNRANKED",
    rank: "IV",
    leaguePoints: 0,
    combinedLP: 0,
    wins: 205,
    loses: 173,
    hotstreak: false,
    lastThree: [
      {
        championName: "null",
        championID: 497,
        win: false,
        id: "EUW1_6792213944",
      },
      {
        championName: "null",
        championID: 432,
        win: true,
        id: "EUW1_6792270986",
      },
      {
        championName: "null",
        championID: 497,
        win: false,
        id: "EUW1_6792346795",
      },
      {
        championName: "null",
        championID: 497,
        win: true,
        id: "EUW1_6792427799",
      },
      {
        championName: "null",
        championID: 432,
        win: false,
        id: "EUW1_6792492999",
      },
    ],
    startTime: 0,
    lpStart: 0,
    gmBorder: 200,
    challBorder: 700,
  };
  const [playerInfo, setPlayerInfo] = useState<Account>(oldAccount as Account);

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
        fetch("https://127.0.0.1:2999/liveclientdata/allgamedata", {
          method: "HEAD",
          mode: "no-cors",
        })
          .then(function (response) {
            return response;
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (e) {
            console.log(e);
          });
      }
    }
  }, [nav, query, queueType]);

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
    </Container>
  );
}

function EloInfo({
  eloLP,
  eloDivision,
  eloRank,
  lpDiff,
  gmBorder,
  challBorder,
}: AccountElo) {
  let lpDisplay =
    eloDivision === "MASTER" ||
    eloDivision === "GRANDMASTER" ||
    eloDivision === "CHALLENGER"
      ? eloLP + " LP"
      : eloRank + " " + eloLP + " LP";
  lpDisplay = eloDivision === "UNRANKED" ? "UNRANKED" : lpDisplay;
  const lpToday = lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`;
  let border = undefined;
  if (eloDivision === "MASTER") {
    border = "GM Border: " + gmBorder;
  } else if (eloDivision === "GRANDMASTER") {
    border = "Challenger <br> Border: " + challBorder;
  }
  const query = useQuery();
  const legacy = query.get("legacy") === "true" ? "L" : "";

  return (
    <Row className="eloInfo">
      <Col className="ELO d-flex flex-column justify-content-center align-items-center">
        <img
          src={`../../${eloDivision + legacy}.png`}
          className="eloimg eloAndLP"
        />
        <p className="eloAndLP">{lpDisplay}</p>
      </Col>
      <Col className="ELO text-center">
        {border ? (
          <p
            className="leagueborder"
            dangerouslySetInnerHTML={{ __html: border }}
          />
        ) : (
          <div className="spacer"></div>
        )}
        <p className="lpDiff">Heute:</p>
        <p
          className="lpDiff"
          style={{ color: lpDiff >= 0 ? "#6eff57" : "#FF6565" }}
        >
          {lpToday}
        </p>
      </Col>
    </Row>
  );
}

function Champion({
  mvp,
  index,
  championName,
  win,
  length,
}: ChampionMatchHistory) {
  const imgsrc =
    championName === "null"
      ? "../../null.png"
      : `https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${championName}.png`;
  return (
    <div className="imgdiv" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {mvp && (
        <img
          src={`../../flames.png`}
          alt="Overlay Image"
          className="flamesOverlayIMG"
          style={{ width: `${180 - (length - 1 - index) * 4.5}px` }}
        />
      )}
      <img
        src={imgsrc}
        alt=""
        className="profileImg"
        style={{
          width: `${120 - (length - 1 - index) * 4.5}px`,
        }}
      />
      <img
        src={`../../${win}.png`}
        alt="Overlay Image"
        className="overlayIMG"
        style={{ width: `${120 - (length - 1 - index) * 4.5}px` }}
      />
    </div>
  );
}

export default EloOverlay;
