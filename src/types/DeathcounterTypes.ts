export class Player {
    id: string;
    name: string;
    bosses: Boss[];
    currentBoss: number;
    triesInGraph: number;
    showAll: boolean;
    constructor(id: string, name: string, bosses: Boss[] | undefined, currentBoss: number, triesInGraph: number, showAll: boolean) {
        this.id = id;
        this.name = name;
        this.bosses = bosses ? bosses : [new Boss("Other Monsters or Heights", undefined, false)];
        this.currentBoss = currentBoss;
        this.triesInGraph = triesInGraph;
        this.showAll = showAll;
    }
}

export class Boss {
    name: string;
    deaths: number[];
    secondPhase: boolean;

    constructor(name: string, deaths: number[] | undefined, secondPhase: boolean) {
        this.name = name;
        this.deaths = deaths ? deaths : [100];
        this.secondPhase = secondPhase;
    }
}

export interface PlayerD {
    player: Player;
    callback: React.Dispatch<React.SetStateAction<Player>>;
}

export const DEFAULTPLAYER = new Player("TEST", "TESTPLAYER", undefined, 0, 5, false);
