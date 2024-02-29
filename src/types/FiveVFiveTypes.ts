export class Team {
    teamName: string;
    wonGames: string[];
    points: number;
    constructor(teamName: string, wonGames: string[], points: number) {
        this.teamName = teamName;
        this.wonGames = wonGames;
        this.points = points;
    }
}

export class VS {
    currentGame: string;
    bestof: string;
    standing: string;
    constructor(currentGame: string, bestof: string, standing: string) {
        this.currentGame = currentGame;
        this.bestof = bestof;
        this.standing = standing;
    }
}