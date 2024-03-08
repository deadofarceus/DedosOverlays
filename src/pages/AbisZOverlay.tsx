import { useEffect, useState } from "react";
import { AbisZWebsocket } from "../types/WebsocketTypes";
import {
  AbisZAccount,
  AccountElo,
  ChampionAbisZ,
  TESTABISZ,
  LetterGroup,
} from "../types/LeagueTypes";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/AbisZOverlay.css";
import { useParams } from "react-router-dom";

let ws: AbisZWebsocket;

function AbisZOverlay() {
  const [account, setAccount] = useState<AbisZAccount>(TESTABISZ);
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

  return (
    <Container className="AbisZContainer">
      <Row className="topROW">
        <ChampGroupD
          letter={currentGroup.letter}
          champions={currentGroup.champions}
          won={currentGroup.won}
        />
        <Col className="gamesPlayed">
          <h3>Games</h3>
          <h1>{account.loses + account.wins}</h1>
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
      <Row className="azChampRow">
        {champions.map((champ) => (
          <ChampD name={champ.name} won={champ.won} />
        ))}
      </Row>
    </Col>
  );
}

function ChampD({ name, won }: ChampionAbisZ) {
  const imgsrc =
    name === "null"
      ? "../../null.png"
      : `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${name}.png`;
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
      {won && <div className="overlayIMGAZ" />}
    </div>
  );
}

function EloD({ eloLP, eloDivision, eloRank }: AccountElo) {
  let lpDisplay =
    eloDivision === "MASTER" ||
    eloDivision === "GRANDMASTER" ||
    eloDivision === "CHALLENGER"
      ? eloLP + " LP"
      : eloRank + " " + eloLP + " LP";
  lpDisplay = !eloDivision ? "UNRANKED" : lpDisplay;

  return (
    <Row className="eloInfoAZ">
      <Col className="ELOAZ d-flex flex-column justify-content-center align-items-center">
        <img
          src={`../../${eloDivision ? eloDivision : "UNRANKED"}.png`}
          className="eloimgAZ"
        />
        <p className="eloAndLPAZ">{lpDisplay}</p>
      </Col>
    </Row>
  );
}

export default AbisZOverlay;
