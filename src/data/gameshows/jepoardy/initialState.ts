import { JepoardyGameState } from "../../../types/gameshows/Jepoardy";
import { classic0 } from "./board2";
import { classic1 } from "./board3";
import { makeQuestion } from "./builders";

export const TESTGamestate: JepoardyGameState = {
  password: "test",
  admin: {
    name: "Autophil",
    vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
  },
  currentPlayer: 1,
  players: [
    {
      name: "Krokoboss",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
      yoinkJoker: false,
      noYouJoker: false,
      gmJoker: -1,
    },
    {
      name: "Kutcher",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
      yoinkJoker: false,
      noYouJoker: false,
      gmJoker: -1,
    },
    {
      name: "Broeki",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
      yoinkJoker: false,
      noYouJoker: false,
      gmJoker: -1,
    },
    {
      name: "TwoStone",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
      yoinkJoker: false,
      noYouJoker: false,
      gmJoker: -1,
    },
  ],
  state: "BOARD",
  currentBoard: classic0,
  currentRandomQuestions: [
    makeQuestion({
      id: 5,
      category: "Erkennen",
      points: 100,
      type: "TEXT",
      question: "Wie viele Finger zeige ich?",
      answer: "5",
      finished: true,
    }),
  ],
  currentQuestion: {
    id: -1,
    category: "START",
    points: 100,
    type: "TEXT",
    state: "ACTIVE",
    extra: "Active",
    question: "STARTFRAGE",
    answertype: "TEXT",
    answer: "START",
    finished: true,
    buzzedPlayers: [
      {
        name: "Krokoboss",
        points: 0,
        vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
        turn: false,
        buzzed: false,
        yoinkJoker: true,
        noYouJoker: true,
        gmJoker: 1,
      },
    ],
  },
  boards: [classic0, classic1],
  buzzerQueue: [],
};
