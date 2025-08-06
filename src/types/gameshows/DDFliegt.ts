export interface DDFliegtGameState {
  players: DDFPlayer[];
  showTurn: boolean;
}

export interface DDFPlayer {
  admin: boolean;
  yourTurn: boolean;
  name: string;
  finalePoints: number;
  fontSize: number;
  lifes: number;
  invulnerable: boolean;
  answers: boolean[];
  winner: boolean;
}
