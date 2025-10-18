import { useEffect, useState } from "react";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { clearBuzzer, preloadImages, useQuery } from "../../../types/UsefulFunctions";
import { AICombineWebsocket } from "../../../types/WebsocketTypes";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../../styles/gameshows/AICombine.css";
import TeamView from "./TeamView";
import AICombination from "./AICombination";
import Buzzer from "../../util/Buzzer";
import VDOLink from "../../util/VDOLink";

let ws: AICombineWebsocket;

export const STARTGAMESTATE: AICombGameState = {
  admin: "Phil",
  teams: [
    { member: ["langerName", "anderer langer"], points: 0 },
    { member: ["test1", "test11"], points: 0 },
    { member: ["test2", "test22"], points: 0 },
    { member: ["test3", "test33"], points: 0 },
    { member: ["test4", "test44"], points: 0 },
    { member: ["test5", "test55"], points: 0 },
  ],
  currentPosition: 0,
  combination: {
    left: "AIHidden",
    right: "AIHidden",
    leftShown: false,
    rightShown: false,
    combined: "AIHidden",
  },
  vdoNinjaLinks: ["", "", "", "", "", "", ""],
};

export const COMBINATIONS: { left: string; right: string; combined: string }[] = [
  { left: "AIHidden", right: "AIHidden", combined: "AIHidden" },
  {
    left: "Ambessa_0",
    right: "Annie_0",
    combined: "Annie_x_Ambessa1",
  },
  {
    left: "Anivia_0",
    right: "Ashe_0",
    combined: "Ashe_x_Anivia",
  },
  {
    left: "AurelionSol_0",
    right: "Smolder_0",
    combined: "smolder_x_asol",
  },
  {
    left: "Maokai_24",
    right: "Teemo_4",
    combined: "astronaut_teemo_x_maokai",
  },
  {
    left: "broeki2323",
    right: "gangplank",
    combined: "broeki_x_poolparty_gangplank",
  },
  {
    left: "Akshan_0",
    right: "handofblood2",
    combined: "hänno_x_akshan",
  },
  {
    left: "karniiii",
    right: "Nidalee_3",
    combined: "karni_x_maid_nida",
  },
  {
    left: "krokoboss",
    right: "Sett_0",
    combined: "krokoboss_x_sett",
  },
  {
    left: "kutcher2",
    right: "Taric_4",
    combined: "poolparty_taric_x_kutcher2",
  },
  {
    left: "Lux_0",
    right: "mahluna",
    combined: "mahluna_x_lux",
  },
  {
    left: "Caitlyn_0",
    right: "maxim",
    combined: "maxim_x_caitlyn",
  },
  {
    left: "Gragas_0_(1)",
    right: "metashi2",
    combined: "metashi_x_gragas",
  },
  {
    left: "noway5",
    right: "pantheon",
    combined: "noway_x_bäcker_pantheon",
  },
  {
    left: "cz7QQqS",
    right: "DrMundo_0",
    combined: "obsess_x_mundo",
  },
  {
    left: "heimer",
    right: "papaplatte",
    combined: "papaplatte_x_explodierter_heimerdinger",
  },
  {
    left: "sarahtonin",
    right: "Yuumi_0",
    combined: "sarahtonin_x_yuumi",
  },
  {
    left: "Draven_3",
    right: "solaaaaaa",
    combined: "sola_x_kommentator_draven",
  },
  {
    left: "nida",
    right: "thunny",
    combined: "thunny_x_nida",
  },
  {
    left: "Graves_5",
    right: "tolkinnnn",
    combined: "tolkin_x_poolparty_graves",
  },
  {
    left: "DrMundo_2",
    right: "vadda",
    combined: "vadda_x_mundo",
  },
  {
    left: "shacooo",
    right: "zeniv",
    combined: "zeniv_x_shaco",
  },
  {
    left: "johnny1",
    right: "Shaco_0",
    combined: "johnny_x_shaco",
  },
  {
    left: "Gragas_0",
    right: "handofblood1",
    combined: "hänno_x_gragas",
  },
  {
    left: "karni534",
    right: "Teemo_2",
    combined: "karni_x_späher_teemo",
  },
  {
    left: "Bard_0",
    right: "kutcher",
    combined: "kutcher_x_bard",
  },
  {
    left: "Katarina_0",
    right: "noway78",
    combined: "noway_x_katarina",
  },
  {
    left: "broeki",
    right: "Neeko_0",
    combined: "broeki_x_neeko",
  },
  {
    left: "sola23",
    right: "twistedfate",
    combined: "sola_x_tango_twisted_fate",
  },
  {
    left: "briar",
    right: "hännno",
    combined: "hänno_x_briar",
  },
  {
    left: "maxim33",
    right: "tristana",
    combined: "maxim33_x_tristana",
  },
];

function AIcController() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const isTeams = query.get("teams") === "true";

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new AICombineWebsocket(id, setData, addBuzzer);

      preloadImages(
        COMBINATIONS.map((combination) => "../../AICombine/" + combination.left + ".png").concat(
          COMBINATIONS.map((combination) => "../../AICombine/" + combination.right + ".png").concat(
            COMBINATIONS.map((combination) => "../../AICombine/" + combination.combined + ".png")
          )
        )
      );
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
              <TeamView key={index} team={team} index={index} handlePoints={handlePoints} />
            ))}
          </Col>
        </Row>
        <Col className="centerC w-100 AIcVDOLinks blackOutline">
          <h3>Set VDONinja Links</h3>
          <VDOLink
            name={data.admin}
            index={data.vdoNinjaLinks.length - 1}
            link={data.vdoNinjaLinks[data.vdoNinjaLinks.length - 1]}
            handleChange={handleVDOLinkChange}
          />
          {data.vdoNinjaLinks.slice(0, -1).map((link, index) => (
            <VDOLink
              key={index}
              name={isTeams ? data.teams[index % 3].member[index % 2] : data.teams[index].member[0]}
              index={index}
              link={link}
              handleChange={handleVDOLinkChange}
            />
          ))}
        </Col>
      </Col>
      <Col className="centerC AIcCombinationControll">
        <AICombination combination={data.combination} />
        <h1 className="blackOutline AIcCombCounter">{`${data.currentPosition + 1}/${
          COMBINATIONS.length
        }`}</h1>
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
