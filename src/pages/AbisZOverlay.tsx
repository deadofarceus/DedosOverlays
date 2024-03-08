import { useEffect, useState } from "react";
import { AbisZWebsocket } from "../types/WebsocketTypes";
import {
  AbisZAccount,
  ChampionAbisZ,
  DEFAULTABISZ,
  LetterGroup,
} from "../types/LeagueTypes";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/AbisZOverlay.css";

let ws: AbisZWebsocket;

function AbisZOverlay() {
  const [account, setAccount] = useState<AbisZAccount>(DEFAULTABISZ);

  useEffect(() => {
    if (!ws) {
      ws = new AbisZWebsocket("id", setAccount);
    }
  }, []);

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
      </Row>
    </Container>
  );
}

function ChampGroupD({ letter, champions, won }: LetterGroup) {
  return (
    <Col className="azChampCol">
      <h1>{letter}</h1>
      <Row className="azChampRow">
        {champions.map((champ) => (
          <ChampD name={champ.name} won={champ.won} />
        ))}
      </Row>
      <h1>{won}</h1>
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

export default AbisZOverlay;
