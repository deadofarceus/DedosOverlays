import { JepoardyGameState } from "../../../types/gameshows/Jepoardy";
import { board0 } from "./board0";
import { board1 } from "./board1";
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
      yoinkJoker: true,
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
      noYouJoker: true,
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
      gmJoker: 1,
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
  currentBoard: board1,
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
  boards: [board0, board1],
  buzzerQueue: [],
};
