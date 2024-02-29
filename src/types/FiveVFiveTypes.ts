export class Team {
    teamName: string;
    wonGames: string[];
    constructor(teamName: string, wonGames: string[]) {
        this.teamName = teamName;
        this.wonGames = wonGames;
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