export interface AICombGameState {
  teams: Team[];
  currentPosition: number;
  combination: Combination;
}

export interface Team {
  member: Member[];
  points: number;
  admin: boolean;
}

export interface Member {
  name: string;
  vdoNinjaLink: string;
}

export interface Combination {
  left: string;
  right: string;
  leftShown: boolean;
  rightShown: boolean;
  combined: string;
}
