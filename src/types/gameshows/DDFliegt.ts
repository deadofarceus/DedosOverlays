export interface DDFliegtGameState {
  players: DDFPlayer[];
}

export interface DDFPlayer {
  index: number;
  name: string;
  lifes: 0 | 1 | 2 | 3;
  invulnerable: boolean;
  answers: boolean[];
}
