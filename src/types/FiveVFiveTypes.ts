export class Team {
    teamName: string;
    wonGames: Game[];
    points: number;
    constructor(teamName: string, wonGames: Game[], points: number) {
        this.teamName = teamName;
        this.wonGames = wonGames;
        this.points = points;
    }
}

export class Game {
    gameName: string;
    points: number;
    constructor(gameName: string, points: number) {
        this.gameName = gameName;
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