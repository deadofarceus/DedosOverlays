export interface JepoardyGame {
  currentState: number;
  states: JepoardyGameState[];
}

export interface JepoardyGameState {
  admin: JepoardyAdmin;
  players: JepoardyPlayer[];
  boards: Board[];
  currentBoard: Board;
  currentQuestion: Question;
  currentPlayer: number;
  currentRandomQuestions: Question[];
  buzzerQueue: string[];
  password: string;
  state: "START" | "BOARD" | "QUESTION" | "RANDOMQUESTION";
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
  yoinkJoker: boolean;
  noYouJoker: boolean;
  gmJoker: number;
}

export interface Board {
  id: number;
  categories: Category[];
  extra: "default" | "forced" | "DREHDASRAD"; // das ist so cheaten haha this is going to backfire 100%
}

export interface Category {
  name: string;
  extra: "default" | "forced";
  questions: Question[][];
}

export interface Question {
  id: number;
  category: string;
  points: number;
  type: "AUDIO" | "IMAGE" | "TEXT" | "VIDEO";
  extra:
    | "Active"
    | "Taunt"
    | "Windfury"
    | "Gold"
    | "Inactive"
    | "Safezone"
    | "Corrupted";
  question: string;
  answertype: "VIDEO" | "TEXT" | "IMAGE";
  answer: string;
  state: "PAUSED" | "INVISIBLE" | "ACTIVE";
  finished: boolean;
  buzzedPlayers: JepoardyPlayer[];
  info?: string;
  joker?: string;
  usedJokers?: string;
}

export interface JepoardyGameProps {
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
  clearBuzzer: () => void;
  clearOneBuzzer: (buzzer: string) => void;
  buzzerQueue: string[];
}

export interface JepoardyQuestionProps {
  questions: Question[];
  sendState: (newState: JepoardyGameState) => void;
  gamestate: JepoardyGameState;
}

export interface JepoardySingleQuestionProps {
  question: Question;
  sendState: (newState: JepoardyGameState) => void;
  gamestate: JepoardyGameState;
}

import { TESTGamestate } from "../../data/gameshows/jepoardy/initialState";
export { TESTGamestate };
