export interface AICombGameState {
  admin: string;
  teams: Team[];
  currentPosition: number;
  combination: Combination;
  password: string;
}

export interface Team {
  member: Member[];
  points: number;
}

export interface Member {
  name: string;
}

export interface Combination {
  left: string;
  right: string;
  leftShown: boolean;
  rightShown: boolean;
  combined: string;
}
