export interface DDFliegtGameState {
  players: DDFPlayer[];
}

export interface DDFPlayer {
  admin: boolean;
  yourTurn: boolean;
  name: string;
  lifes: number;
  invulnerable: boolean;
  answers: boolean[];
}
