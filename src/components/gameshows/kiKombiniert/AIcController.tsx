import { useEffect, useState } from "react";
import { GameState } from "../../../types/gameshows/AICombine";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../../styles/gameshows/AICombine.css";
import TeamView from "./TeamView";
import AICombination from "./AICombination";

let ws: BroadcastWebsocket<GameState>;

const STARTGAMESTATE: GameState = {
  teams: [
    { member: ["test1", "test2"], points: 0 },
    { member: ["test3", "test4"], points: 0 },
    { member: ["test5", "test6"], points: 0 },
  ],
  currentPosition: 0,
  combination: {
    left: "pokeball",
    right: "pokeball",
    leftShown: false,
    rightShown: false,
    combined: "pokeball",
  },
  buzzerQueue: [],
};

const COMBINATIONS: { left: string; right: string; combined: string }[] = [];

function AIcController() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [data, setData] = useState<GameState>(STARTGAMESTATE);

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new BroadcastWebsocket<GameState>(id, setData);
    }
  }, [query]);

  const sendData = (newData: GameState) => {
    if (!ws) return;
    ws.sendData(newData);
  };

  const handlePoints = (points: number, index: number) => {
    const newTeams = [...data.teams];
    newTeams[index].points += points;
    sendData({ ...data, teams: newTeams });
  };

  const handleRevealLeft = () => {
    sendData({
      ...data,
      combination: { ...data.combination, leftShown: !data.combination.leftShown },
    });
  };

  const handleRevealRight = () => {
    sendData({
      ...data,
      combination: { ...data.combination, rightShown: !data.combination.rightShown },
    });
  };

  const handleGoNext = (increment: number) => {
    const nextPos = data.currentPosition + (increment % COMBINATIONS.length);
    const nextCombination = {
      left: COMBINATIONS[nextPos].left,
      right: COMBINATIONS[nextPos].right,
      leftShown: false,
      rightShown: false,
      combined: COMBINATIONS[nextPos].combined,
    };
    //TODO Clear Buzzers
    sendData({ ...data, currentPosition: nextPos, combination: nextCombination });
  };

  console.log(data);

  return (
    <Container className="AIcController centerR">
      <Row className="centerR AIcTeamControllerRow">
        <Col className="centerC w-75 p-0">
          {data.teams.map((team, index) => (
            <TeamView key={index} team={team} />
          ))}
        </Col>
        <Col className="centerC w-25">
          {data.teams.map((_team, index) => (
            <Row key={index} className="centerR AIcPointControll">
              <Button
                className="blackOutline AIcPointbutton"
                variant="success"
                onClick={() => handlePoints(1, index)}
              >
                +1
              </Button>
              <Button
                className="blackOutline AIcPointbutton"
                variant="danger"
                onClick={() => handlePoints(-1, index)}
              >
                -1
              </Button>
            </Row>
          ))}
        </Col>
      </Row>
      <Col className="centerC AIcCombinationControll">
        <AICombination combination={data.combination} />
        <Col className="centerC w-100">
          <Row className="w-100 centerR">
            <Button
              className="AIcCombButtons blackOutline"
              variant={data.combination.leftShown ? "danger" : "success"}
              onClick={() => handleRevealLeft()}
            >
              {data.combination.leftShown ? "Hide Left" : "Reveal Left"}
            </Button>
            <Button
              className="AIcCombButtons blackOutline"
              variant={data.combination.rightShown ? "danger" : "success"}
              onClick={() => handleRevealRight()}
            >
              {data.combination.rightShown ? "Hide Right" : "Reveal Right"}
            </Button>
          </Row>
          <Row className="w-100 centerR">
            <Button
              className="AIcCombButtons blackOutline"
              variant="primary"
              onClick={() => handleGoNext(1)}
            >
              Next Combination
            </Button>
            <Button
              className="AIcCombButtons blackOutline"
              variant="primary"
              onClick={() => handleGoNext(-1)}
            >
              Previous Combination
            </Button>
          </Row>
        </Col>
      </Col>
      {/* <Col className="centerC AIcBuzzerQueue">BUZZER REIHENFOLGE</Col> */}
    </Container>
  );
}

export default AIcController;
