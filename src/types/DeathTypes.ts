export class DeathData {
    players: Player[];
    constructor(players: Player[]) {
        this.players = players;
    }
}

export class Player {
    playerName: string;
    deaths: number;
    id!: string;
    constructor(playerName: string, deaths: number) {
        this.playerName = playerName;
        this.deaths = deaths;
    }
}

export interface PlayerInfo {
    playerName: string;
    deaths: number
}

export interface TimerInfo {
    timerstart: number
}