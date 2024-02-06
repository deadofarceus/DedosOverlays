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
    lpStart!: number;
    queueListenID: number;

    constructor(
        puuid: string,
        summonerId: string,
        name: string,
        hashtag: string,
        queueListenID: number
    ) {
        this.puuid = puuid;
        this.summonerId = summonerId;
        this.name = name;
        this.hashtag = hashtag;
        this.queueListenID = queueListenID;
    }
}

export class Match {
    championName: string;
    championID: number;
    win: boolean;
    id: string;
    constructor(id: string, championName: string, championID: number, win: boolean) {
        this.id = id;
        this.championName = championName;
        this.championID = championID;
        this.win = win;
    }
}

export interface ChampionMatchHistory {
    index: number;
    championName: string;
    win: boolean;
    length: number
}

export interface AccountElo {
    eloLP: number;
    eloDivision: string;
    eloRank: string;
    lpDiff: number;
}

export interface QueueType {
    queueId: number;
    map: string;
    description: string;
    notes: string | null;
}

export const QUEUETYPES: Map<string, QueueType> = new Map();

QUEUETYPES.set("flex", {
    "queueId": 440,
    "map": "Summoner's Rift",
    "description": "5v5 Ranked Flex games",
    "notes": null
});

QUEUETYPES.set("soloduo", {
    "queueId": 420,
    "map": "Summoner's Rift",
    "description": "5v5 Ranked Solo games",
    "notes": null
});