export interface JepoardyGameState {
  admin: JepoardyAdmin;
  players: JepoardyPlayer[];
  board: Board;
  buzzerQueue: string[];
}

export interface JepoardyAdmin {
  name: string;
  vdoNinjaLink: string;
}

export interface JepoardyPlayer {
  name: string;
  points: number;
  vdoNinjaLink: string;
  turn: boolean;
  buzzed: boolean;
}

export interface Board {
  categories: Category[];
  state: "START" | "BOARD" | "QUESTION";
  question: Question;
}

export interface Category {
  name: string;
  questions: Question[];
}

export interface Question {
  category: string;
  points: number;
  type: "AUDIO" | "IMAGE" | "TEXT" | "VIDEO";
  question: string;
  answertype: "VIDEO" | "TEXT";
  answer: string;
  finished: boolean;
}

export interface JepoardyGameProps {
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
}

export interface JepoardyQuestionProps {
  question: Question;
}

export const TESTGamestate: JepoardyGameState = {
  admin: {
    name: "Autphil",
    vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
  },
  players: [
    {
      name: "Krokoboss",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "Kutcher",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "Broeki",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "TwoStone",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
  ],
  board: {
    categories: [
      {
        name: "Random",
        questions: [
          {
            category: "Random",
            points: 100,
            type: "TEXT",
            question: "Wie viele Finger zeige ich?",
            answertype: "TEXT",
            answer: "5",
            finished: false,
          },
          {
            category: "Random",
            points: 200,
            type: "TEXT",
            question: "Wie viele Finger zeige ich?",
            answertype: "TEXT",
            answer: "5",
            finished: false,
          },
          {
            category: "Random",
            points: 300,
            type: "TEXT",
            question: "Wie viele Finger zeige ich?",
            answertype: "TEXT",
            answer: "5",
            finished: false,
          },
          {
            category: "Random",
            points: 400,
            type: "TEXT",
            question: "Wie viele Finger zeige ich?",
            answertype: "TEXT",
            answer: "5",
            finished: false,
          },
          {
            category: "Random",
            points: 500,
            type: "TEXT",
            question: "Wie viele Finger zeige ich?",
            answertype: "TEXT",
            answer: "5",
            finished: false,
          },
        ],
      },
      {
        name: "Erkennen",
        questions: [],
      },
      {
        name: "Champion",
        questions: [],
      },
      {
        name: "Trivia",
        questions: [],
      },
      {
        name: "Kategorie",
        questions: [],
      },
    ],
    state: "START",
    question: {
      category: "Random",
      points: 100,
      type: "TEXT",
      question: "Wie viele Finger zeige ich?",
      answertype: "TEXT",
      answer: "5",
      finished: false,
    },
  },
  buzzerQueue: ["Krokoboss", "Kutcher", "Broeki", "TwoStone"],
};
