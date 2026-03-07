export interface BuzzerGameState {
  players: Player[];
  buzzerQueue: string[];
}

export interface Player {
  name: string;
  points: number;
  buzzed: boolean;
}
