export interface AICombGameState {
  admin: string;
  teams: Team[];
  currentPosition: number;
  combination: Combination;
  vdoNinjaLinks: string[];
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
