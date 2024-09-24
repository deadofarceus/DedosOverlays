export class CoStreamCardProps {
  date: Date;
  matchups: Matchup[];

  constructor(date: Date, matchups: Matchup[]) {
    this.date = date;
    this.matchups = matchups;
  }
}

export class Matchup {
  team1: string;
  team2: string;
  format: "Bo1" | "Bo3" | "Bo5";
  standing: string;

  constructor(
    team1: string,
    team2: string,
    format: "Bo1" | "Bo3" | "Bo5",
    standing: string
  ) {
    this.team1 = team1;
    this.team2 = team2;
    this.format = format;
    this.standing = standing;
  }
}
