import { useEffect, useState } from "react";
import { AICombGameState, Team } from "../../../types/gameshows/AICombine";
import {
  clearBuzzer,
  clearOneBuzzer,
  preloadImages,
  useQuery,
} from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../../styles/gameshows/AICombine.css";
import TeamView from "./TeamView";
import AICombination from "./AICombination";
import Buzzer from "../../util/Buzzer";

let ws: GameshowWebsocket<AICombGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

export const STARTGAMESTATE: AICombGameState = {
  admin: "Autophil",
  password: "",
  teams: [
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
    {
      member: [{ name: "Name1" }, { name: "Name2" }],
      points: 0,
    },
  ],
  currentPosition: 0,
  combination: {
    left: "AIHidden",
    right: "AIHidden",
    leftShown: false,
    rightShown: false,
    combined: "AIHidden",
  },
};

export const COMBINATIONS: { left: string; right: string; combined: string }[] = [
  { left: "AIHidden", right: "AIHidden", combined: "AIHidden" },
  {
    left: "Corki",
    right: "Obsess1",
    combined: "Obsess_x_Corki",
  },
  {
    left: "LB",
    right: "Nova",
    combined: "Nova_x_LeBlanc",
  },
  {
    left: "Godfist_Lee_Sin",
    right: "Trymacs2",
    combined: "Trymacs_x_God_fist_lee_sin",
  },
  {
    left: "Rumathra1",
    right: "Smolder",
    combined: "Rumathra_x_Smolder",
  },
  {
    left: "Nova2",
    right: "Zyra",
    combined: "Nova_x_Zyra",
  },
  {
    left: "Trymacs1",
    right: "Zac",
    combined: "Trymacs_x_Zac",
  },
  {
    left: "Kutcher",
    right: "Sola",
    combined: "Sola_x_Kutcher",
  },
  {
    left: "Nasus",
    right: "Noway2",
    combined: "Noway_x_Nasus",
  },
  {
    left: "Broeki1",
    right: "Rakan",
    combined: "Broeki_x_Rakan",
  },
  {
    left: "Chefstrobel1",
    right: "Illaoi",
    combined: "Chefstrobel_x_Illaoi",
  },
  {
    left: "Maxim",
    right: "Teemo",
    combined: "Maxim_Teemo",
  },
  {
    left: "Faister",
    right: "Syndra",
    combined: "Faister_Syndra",
  },
  {
    left: "Kled",
    right: "Obsess2",
    combined: "Obsess_und_Kled",
  },
  {
    left: "Ryze",
    right: "Tolkin",
    combined: "Tolkin_Ryze",
  },
  {
    left: "Noway",
    right: "Gragas",
    combined: "Noway_Gragas",
  },
  {
    left: "Broeki5",
    right: "Karni",
    combined: "Broeki_x_Karni",
  },
  {
    left: "Autophil",
    right: "Garen",
    combined: "Autophil_Garen",
  },
  {
    left: "Kayn",
    right: "Chefstrobel2",
    combined: "Chefstrobel_Kayn",
  },
  {
    left: "Karni",
    right: "Lulu",
    combined: "Karni_Lulu",
  },
  {
    left: "Niek",
    right: "Mundo",
    combined: "Niekbeats_Mundo",
  },
  {
    left: "Mel",
    right: "TwoStone2",
    combined: "TwoStone_Mel",
  },
  {
    left: "Kennen",
    right: "Karni1",
    combined: "Karni_Kennen",
  },
  {
    left: "TK",
    right: "Faister1",
    combined: "Faister_TK",
  },
  {
    left: "Rumble",
    right: "Sola3",
    combined: "Sola_Rumble",
  },
  {
    left: "Milio",
    right: "Autophil3",
    combined: "Autophil_Milio",
  },
  {
    left: "Muay_Thai_Lee_Sin",
    right: "Niekbeats3",
    combined: "Niekbeats_Lee_Sin",
  },
  {
    left: "Taric",
    right: "Rumathra2",
    combined: "Rumathra_x_Taric",
  },
  {
    left: "Olaf",
    right: "Broeki",
    combined: "Broeki_Olaf",
  },
  {
    left: "Hänno",
    right: "Mundo5",
    combined: "hänno_mundo",
  },
  {
    left: "Tolkin4",
    right: "Viego",
    combined: "Tolkin_Viego",
  },
  {
    left: "Akali",
    right: "Mahluna",
    combined: "Mahluna_Akali",
  },
];

function AIcController() {
  document.body.className = "noOBS";
  const query = useQuery();
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");
  const [volume, setVolume] = useState<number>(10);

  useEffect(() => {
    const id = query.get("id");
    if (id && !ws) {
      ws = new GameshowWebsocket<AICombGameState>(id, setData, addBuzzer);
      preloadImages(
        COMBINATIONS.map((combination) => "../../AICombine/" + combination.left + ".png").concat(
          COMBINATIONS.map((combination) => "../../AICombine/" + combination.right + ".png").concat(
            COMBINATIONS.map((combination) => "../../AICombine/" + combination.combined + ".png")
          )
        )
      );
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    audio.volume = Math.min(1, Math.max(0, volume / 100));
  }, [volume]);

  const sendData = (newData: AICombGameState) => {
    if (!ws) return;
    ws.sendData(newData);
  };

  const handleChange = (team: Team, index: number) => {
    const newTeams = [...data.teams];
    newTeams[index] = team;
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

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (buzzer.startsWith("CLEAR_")) {
        const toRemove = buzzer.split("_")[1];
        return prevQueue.filter((b) => b !== toRemove);
      } else if (!prevQueue.includes(buzzer)) {
        if (prevQueue.length === 0) {
          audio.play();
        }
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const handleClearBuzzer = () => {
    clearBuzzer(query.get("id")!);
    setBuzzerQueue([]);
  };

  const handleClearOneBuzzer = (buzzer: string) => {
    clearOneBuzzer(query.get("id")!, buzzer);
  };

  const nextCombination = COMBINATIONS[(data.currentPosition + 1) % COMBINATIONS.length];

  return (
    <Container className="AIcController centerR">
      <Col className="centerC w-100">
        <Row className="centerR AIcTeamControllerRow">
          <Col className="centerC w-75 p-0">
            <Form.Control
              type="text"
              placeholder="Room password"
              value={password}
              className={
                "buzzerUserInput " +
                (password !== data.password ? "passwordChanging" : "passwordSaved")
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                  sendData({ ...data, password: password });
                }
              }}
            />

            {data.teams.map((team, index) => (
              <TeamView key={index} team={team} index={index} handleChange={handleChange} />
            ))}
          </Col>
        </Row>
      </Col>
      <Col className="centerC AIcCombinationControll">
        <AICombination combination={data.combination} />
        <div className="AIcNextComb">
          <h1 className="blackOutline">{`Next Combination: ${nextCombination.combined}`}</h1>
          <img
            src={"../../AICombine/" + nextCombination.combined + ".png"}
            alt={nextCombination.combined}
            className="AIcCombinedImage"
          />
        </div>
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
        <div className="buzzerQueueScroll">
          {buzzerQueue.map((buzzer, index) => (
            <div>
              <Buzzer
                key={index}
                queueSlot={index + 1}
                buzzer={buzzer}
                clear={handleClearOneBuzzer}
              />
            </div>
          ))}
        </div>
        <Button
          variant="danger"
          className="clearBuzzer blackOutline"
          onClick={() => handleClearBuzzer()}
        >
          Clear Buzzer
        </Button>
      </Col>
      <div className="buzzerSoundSlider">
        <span aria-label="Sound" title="Sound">
          🔊
        </span>
        <Form.Range
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value))}
          aria-label="Buzzer Lautstärke"
        />
      </div>
    </Container>
  );
}

export default AIcController;
