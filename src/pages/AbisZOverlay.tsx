import { useEffect, useState } from "react";
import { AbisZWebsocket } from "../types/WebsocketTypes";
import {
  AbisZAccount,
  AccountElo,
  ChampionAbisZ,
  DEFAULTABISZ,
  LetterGroup,
  //   TESTABISZ,
} from "../types/LeagueTypes";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/AbisZOverlay.css";
import { useParams } from "react-router-dom";
import { isOBSBrowser } from "../types/UsefulFunctions";
import { CHAMPIMG_URL } from "../types/Constants";

let ws: AbisZWebsocket;
let fertig: boolean = false;

function AbisZOverlay() {
  const obs = isOBSBrowser();
  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }
  const [account, setAccount] = useState<AbisZAccount>(DEFAULTABISZ);
  const { accountName } = useParams();

  useEffect(() => {
    if (!ws && accountName) {
      ws = new AbisZWebsocket(accountName, setAccount);
    }
  }, [accountName]);

  const currentGroup1 = account.championGroups.find((g) => !g.group.won);
  const currentGroup = currentGroup1
    ? currentGroup1.group
    : account.championGroups[account.championGroups.length - 1].group;
  fertig = !currentGroup1;

  let gamesPlayed = 0;
  for (const group of account.championGroups) {
    gamesPlayed += group.group.champions.reduce((acc, champ) => acc + champ.games, 0);
  }

  return (
    <Container className={fertig ? "fertigAZ" : "AbisZContainer"}>
      <Row className="topROW">
        <ChampGroupD
          letter={currentGroup.letter}
          champions={currentGroup.champions}
          won={currentGroup.won}
        />
        <Col className="gamesPlayed">
          <h3>Games</h3>
          <h1>{gamesPlayed}</h1>
        </Col>
        <EloD
          eloLP={account.leaguePoints}
          eloDivision={account.tier}
          eloRank={account.rank}
          lpDiff={0}
          gmBorder={0}
          challBorder={0}
        />
      </Row>
    </Container>
  );
}

function ChampGroupD({ champions }: LetterGroup) {
  return (
    <Col className="azChampCol">
      <Row className="azChampRow centerR">
        {champions.map((champ) => (
          <ChampD name={champ.name} won={champ.won} games={champ.games} />
        ))}
      </Row>
    </Col>
  );
}

function ChampD({ name, won, games }: ChampionAbisZ) {
  const champName = name === "Wukong" ? "MonkeyKing" : name;
  const imgsrc = name === "null" ? "../../null.png" : `${CHAMPIMG_URL}${champName}.png`;
  return (
    <div
      className={"imgdivAZ"}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <img
        src={imgsrc}
        alt=""
        className={`champImg ${!won ? "champLoseAZ" : ""}`}
        style={{
          width: `120px`,
        }}
      />
      <div
        className={`${won ? "overlayIMGAZ" : "overlayIMGAZLose"}`}
        style={fertig ? { border: `5px solid rgb(255, 226, 59)` } : {}}
      >
        <p className="numOfWins">{games > 0 ? games : ""}</p>
      </div>
    </div>
  );
}

function EloD({ eloLP, eloDivision, eloRank }: AccountElo) {
  let lpDisplay =
    eloDivision === "MASTER" || eloDivision === "GRANDMASTER" || eloDivision === "CHALLENGER"
      ? eloLP + " LP"
      : eloRank + " " + eloLP + " LP";
  lpDisplay = !eloDivision || eloDivision === "UNRANKED" ? "UNRANKED" : lpDisplay;

  return (
    <Row className="eloInfoAZ centerR">
      <Col className="ELOAZ d-flex flex-column justify-content-center align-items-center">
        <img src={`../../${eloDivision ? eloDivision : "UNRANKED"}.png`} className="eloimgAZ" />
        <p className="eloAndLPAZ">{lpDisplay}</p>
      </Col>
    </Row>
  );
}

export default AbisZOverlay;
