import { useEffect, useState } from "react";
import {
  Account,
  AccountElo,
  ChampionMatchHistory,
} from "../types/LeagueTypes";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/EloOverlay.css";
import { EloWebsocket } from "../types/WebsocketTypes";
import { Col, Container, Row } from "react-bootstrap";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const summonerName = params.get("name");
const tag = params.get("tag");
const key = params.get("key");
let ws: EloWebsocket;

function EloOverlay() {
  const oldAccount: object = {
    summonerId: "",
    name: "",
    hashtag: "",
    puuid: "",
    tier: "CHALLENGER",
    rank: "I",
    leaguePoints: 1337,
    combinedLP: 1337,
    wins: 205,
    loses: 173,
    hotstreak: false,
    lastThree: [
      {
        championName: "Veigar",
        championID: 497,
        win: false,
        id: "EUW1_6792213944",
      },
      {
        championName: "Bard",
        championID: 432,
        win: true,
        id: "EUW1_6792270986",
      },
      {
        championName: "Rakan",
        championID: 497,
        win: false,
        id: "EUW1_6792346795",
      },
      {
        championName: "Pyke",
        championID: 497,
        win: true,
        id: "EUW1_6792427799",
      },
      {
        championName: "Gragas",
        championID: 432,
        win: true,
        id: "EUW1_6792492999",
      },
    ],
    startTime: 1706645277,
    lpStart: 1295,
  };
  const [playerInfo, setPlayerInfo] = useState<Account>(oldAccount as Account);

  const nav = useNavigate();

  useEffect(() => {
    if (summonerName === null || tag === null || key === null) {
      // Redirect to error page if any of the parameters is missing
      nav("/errorpage");
    } else {
      if (!ws) {
        ws = new EloWebsocket(summonerName, tag, key, setPlayerInfo);
      }
    }
  }, [nav]);

  playerInfo.lastThree = Array.from(
    new Set(playerInfo.lastThree.map((obj) => JSON.stringify(obj)))
  ).map((str) => JSON.parse(str));

  while (playerInfo.lastThree.length > 5) {
    playerInfo.lastThree.shift();
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <EloInfo
        eloLP={playerInfo.leaguePoints}
        eloDivision={playerInfo.tier}
        eloRank={playerInfo.rank}
        lpDiff={playerInfo.combinedLP - playerInfo.lpStart}
      />
      <Row className="matchhistory" md="auto">
        {playerInfo.lastThree.map((match, index) => (
          <Champion
            key={match.id}
            index={index * 4.5}
            championName={match.championName}
            win={match.win}
          />
        ))}
      </Row>
    </Container>
  );
}

function EloInfo({ eloLP, eloDivision, eloRank, lpDiff }: AccountElo) {
  const lpDisplay =
    eloDivision === "MASTER" ||
    eloDivision === "GRANDMASTER" ||
    eloDivision === "CHALLENGER"
      ? eloLP + " LP"
      : eloRank + " " + eloLP + " LP";
  const lpToday = lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`;
  return (
    <Row className="eloInfo">
      <Col className="ELO d-flex flex-column justify-content-center align-items-center">
        <img src={`../../${eloDivision}.png`} className="eloimg" />
        <p>{lpDisplay}</p>
      </Col>
      <Col className="ELO text-center">
        <div className="spacer"></div>
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

function Champion({ index, championName, win }: ChampionMatchHistory) {
  return (
    <div className="imgdiv" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${championName}.png`}
        alt=""
        className="profileImg"
        style={{
          width: `${120 - index}px`,
        }}
      />
      <img
        src={`../../${win}.png`}
        alt="Overlay Image"
        className="overlayIMG"
        style={{ width: `${120 - index}px` }}
      />
    </div>
  );
}

export default EloOverlay;
