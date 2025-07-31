import { useEffect, useState } from "react";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { clearBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { AICombineWebsocket } from "../../../types/WebsocketTypes";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../../styles/gameshows/AICombine.css";
import TeamView from "./TeamView";
import AICombination from "./AICombination";
import Buzzer from "../../util/Buzzer";
import VDOLink from "../../util/VDOLink";

let ws: AICombineWebsocket;

export const STARTGAMESTATE: AICombGameState = {
  teams: [
    { member: ["test1", "test2"], points: 0 },
    { member: ["test3", "test4"], points: 0 },
    { member: ["test5", "test6"], points: 0 },
  ],
  currentPosition: 0,
  combination: {
    left: "AIHidden",
    right: "AIHidden",
    leftShown: false,
    rightShown: false,
    combined: "AIHidden",
  },
  vdoNinjaLinks: ["", "", "", "", "", ""],
};

const COMBINATIONS: { left: string; right: string; combined: string }[] = [
  { left: "AIHidden", right: "AIHidden", combined: "AIHidden" },
  { left: "veigar_greybeard", right: "tolkingandalf", combined: "veigar_greybeard_x_tolkin" },
  { left: "AIHidden", right: "AIHidden", combined: "AIHidden" },
  { left: "", right: "", combined: "" },
];

function AIcController() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new AICombineWebsocket(id, setData, addBuzzer);
    }
  }, [query]);

  const sendData = (newData: AICombGameState) => {
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
    const nextPos = (data.currentPosition + increment) % COMBINATIONS.length;
    const nextCombination = {
      left: COMBINATIONS[nextPos].left,
      right: COMBINATIONS[nextPos].right,
      leftShown: false,
      rightShown: false,
      combined: COMBINATIONS[nextPos].combined,
    };
    sendData({ ...data, currentPosition: nextPos, combination: nextCombination });
  };

  const handleVDOLinkChange = (index: number, link: string) => {
    const newLinks = [...data.vdoNinjaLinks];
    newLinks[index] = link;
    sendData({ ...data, vdoNinjaLinks: newLinks });
  };

  const addBuzzer = (buzzer: string) => {
    if (buzzer === "CLEARBUZZERQUEUE") {
      setBuzzerQueue([]);
    } else if (!buzzerQueue.includes(buzzer)) {
      setBuzzerQueue([...buzzerQueue, buzzer]);
    }
  };

  const handleClearBuzzer = () => {
    clearBuzzer(query.get("id")!);
    setBuzzerQueue([]);
  };

  return (
    <Container className="AIcController centerR">
      <Col className="centerC w-100">
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
        <Col className="centerC w-100 AIcVDOLinks blackOutline">
          <h3>Set VDONinja Links</h3>
          {data.vdoNinjaLinks.map((link, index) => (
            <VDOLink key={index} index={index} link={link} handleChange={handleVDOLinkChange} />
          ))}
        </Col>
      </Col>
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
              onClick={() => handleGoNext(-1)}
            >
              Previous Combination
            </Button>
            <Button
              className="AIcCombButtons blackOutline"
              variant="primary"
              onClick={() => handleGoNext(1)}
            >
              Next Combination
            </Button>
          </Row>
        </Col>
      </Col>
      <Col className="centerC AIcBuzzerQueue">
        <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
        {buzzerQueue.map((buzzer, index) => (
          <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} />
        ))}
        <Button
          variant="danger"
          className="clearBuzzer blackOutline"
          onClick={() => handleClearBuzzer()}
        >
          Clear Buzzer
        </Button>
      </Col>
    </Container>
  );
}

export default AIcController;
