export class Account {
    summonerId: string;
    name: string;
    hashtag: string;
    accountId!: string;
    puuid: string;
    tier!: string;
    rank!: string;
    leaguePoints!: number;
    combinedLP!: number;
    wins!: number;
    loses!: number;
    hotstreak!: boolean;
    lastThree: Match[] = [];
    startTime: number;
    lpStart!: number;

    constructor(
        puuid: string,
        summonerId: string,
        name: string,
        hashtag: string,
        startTime: number
    ) {
        this.puuid = puuid;
        this.summonerId = summonerId;
        this.name = name;
        this.hashtag = hashtag;
        this.startTime = startTime;
    }
}

export class Match {
    championName: string;
    championID: number;
    win: boolean;
    id: string;
    constructor(id:string, championName: string, championID: number, win: boolean) {
        this.id = id;
        this.championName = championName;
        this.championID = championID;
        this.win = win;
    }
}

export interface ChampionMatchHistory {
    height: number;
    right: number;
    championName: string;
    win: boolean;
}

export interface AccountElo {
    eloLP: number; 
    eloDivision: string;
    eloRank: string; 
    lpDiff: number; 
}