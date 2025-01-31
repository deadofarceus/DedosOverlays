import { Container, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  CoStreamCardProps,
  Matchup,
} from "../../types/oldOrUnused/CoStreamTypes";
import { useQuery } from "../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../types/WebsocketTypes";
import WorldsCoCast from "./WorldsCoCast";

const teams = [
  "TBD",
  "FNC",
  "T1",
  "100",
  "DK",
  "TL",
  "BLG",
  "G2",
  "FLY",
  "GAM",
  "GEN",
  "HLE",
  "LNG",
  "MDK",
  "PNG",
  "PSG",
  "R7",
  "SHG",
  "TES",
  "VKE",
  "WBG",
];

let ws: BroadcastWebsocket<CoStreamCardProps[]>;

function WorldsCoCastMod() {
  document.body.className = "noOBS";
  const [coStreamCards, setCoStreamCards] = useState<CoStreamCardProps[]>(
    () => {
      const savedCards = JSON.parse(
        localStorage.getItem("coStreamCards") || "[]"
      );
      return savedCards.map((card: any) => ({
        ...card,
        date: new Date(card.date),
      }));
    }
  );

  console.log(coStreamCards);
  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    if (!ws && id) {
      ws = new BroadcastWebsocket(id);
      if (coStreamCards.length > 0) {
        setTimeout(() => {
          ws.sendData(coStreamCards);
        }, 200);
      }
    }
  }, [query]);

  const addCoStreamCard = () => {
    setCoStreamCards([
      ...coStreamCards,
      new CoStreamCardProps(new Date(), [new Matchup("", "", "", "0-0")]),
    ]);
  };

  const removeCoStreamCard = (index: number) => {
    const newCoStreamCards = coStreamCards.filter((_, i) => i !== index);
    setCoStreamCards(newCoStreamCards);
  };

  const addMatchup = (index: number) => {
    const newCoStreamCards = [...coStreamCards];
    newCoStreamCards[index].matchups.push(new Matchup("", "", "", "0-0"));
    setCoStreamCards(newCoStreamCards);
  };

  const removeMatchup = (index: number, matchupIndex: number) => {
    const newCoStreamCards = [...coStreamCards];
    newCoStreamCards[index].matchups.splice(matchupIndex, 1);
    setCoStreamCards(newCoStreamCards);
  };

  if (ws) {
    ws.sendData(coStreamCards);
    localStorage.setItem("coStreamCards", JSON.stringify(coStreamCards));
  }
  return (
    <Container className="centerR coCastMod">
      <Col>
        <Form>
          {coStreamCards.map((card, index) => (
            <div key={index} className="coCastFormDiv m-2">
              <Form.Group className="mb-2 coCastForm">
                <Form.Label>Datum</Form.Label>
                <input
                  type="datetime-local"
                  value={card.date.toISOString().slice(0, 16)}
                  onChange={(date) => {
                    const newCoStreamCards = [...coStreamCards];
                    newCoStreamCards[index].date = new Date(date.target.value);
                    setCoStreamCards(newCoStreamCards);
                  }}
                />
              </Form.Group>
              {/* Inputs für Matchups */}
              {card.matchups.map((matchup, matchupIndex) => (
                <div key={matchupIndex} className="coCastFormDiv m-2">
                  <Form.Group>
                    <Form.Label>Team 1</Form.Label>
                    <select
                      value={matchup.team1 || ""}
                      onChange={(e) => {
                        const newCoStreamCards = [...coStreamCards];
                        newCoStreamCards[index].matchups[matchupIndex].team1 =
                          e.target.value;
                        setCoStreamCards(newCoStreamCards);
                      }}
                    >
                      {teams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Team 2</Form.Label>
                    <select
                      value={matchup.team2 || ""}
                      onChange={(e) => {
                        const newCoStreamCards = [...coStreamCards];
                        newCoStreamCards[index].matchups[matchupIndex].team2 =
                          e.target.value;
                        setCoStreamCards(newCoStreamCards);
                      }}
                    >
                      {teams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Format</Form.Label>
                    <select
                      value={matchup.format || "Bo1"}
                      onChange={(e) => {
                        const newCoStreamCards = [...coStreamCards];
                        newCoStreamCards[index].matchups[matchupIndex].format =
                          e.target.value as "Bo1" | "Bo3" | "Bo5";
                        setCoStreamCards(newCoStreamCards);
                      }}
                    >
                      <option value="Bo1">Bo1</option>
                      <option value="Bo3">Bo3</option>
                      <option value="Bo5">Bo5</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Standing</Form.Label>
                    <input
                      type="text"
                      value={matchup.standing || ""}
                      onChange={(e) => {
                        const newCoStreamCards = [...coStreamCards];
                        newCoStreamCards[index].matchups[
                          matchupIndex
                        ].standing = e.target.value;
                        setCoStreamCards(newCoStreamCards);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => removeMatchup(index, matchupIndex)}
                  >
                    Delete Matchup
                  </Button>
                </div>
              ))}

              <Button variant="success" onClick={() => addMatchup(index)}>
                Add Matchup
              </Button>
              <Button
                variant="danger"
                onClick={() => removeCoStreamCard(index)}
              >
                Delete CoStream
              </Button>
            </div>
          ))}
          <Form.Group>
            <Button variant="primary" onClick={addCoStreamCard}>
              CoStream hinzufügen
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Container className="w-50">
        <WorldsCoCast />
      </Container>
    </Container>
  );
}

export default WorldsCoCastMod;
