export interface AICombGameState {
  teams: Team[];
  currentPosition: number;
  combination: Combination;
  buzzerQueue: string[];
}

export interface Team {
  member: string[];
  points: number;
}

export interface Combination {
  left: string;
  right: string;
  leftShown: boolean;
  rightShown: boolean;
  combined: string;
}
