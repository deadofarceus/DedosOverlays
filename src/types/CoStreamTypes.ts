export interface CoStreamCardProps {
  date: Date;
  matchups: Matchup[];
}

export interface Matchup {
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  format: "Bo1" | "Bo3" | "Bo5";
  standing:
    | ""
    | "0-0"
    | "1-0"
    | "2-0"
    | "3-0"
    | "2-1"
    | "3-1"
    | "3-2"
    | "0-1"
    | "0-2"
    | "0-3"
    | "1-1"
    | "1-2"
    | "1-3"
    | "2-2"
    | "2-3";
}
