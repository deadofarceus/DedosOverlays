export class Player {
    id: string;
    name: string;
    bosses: Boss[];
    currentBoss: number;
    settings: Settings;
    prediction: number[] = [];
    constructor(id: string, name: string, bosses: Boss[] | undefined, currentBoss: number, settings: Settings) {
        this.id = id;
        this.name = name;
        this.bosses = bosses ? bosses : [new Boss("Other Monsters or Heights", undefined, false)];
        this.currentBoss = currentBoss;
        this.settings = settings;
    }
}

export class Settings {
    triesInGraph: number;
    showAll: boolean;
    showPrediction: boolean;
    showLinear: boolean;
    constructor(triesInGraph: number, showAll: boolean, showPrediction: boolean, showLinear: boolean) {
        this.triesInGraph = triesInGraph;
        this.showAll = showAll;
        this.showPrediction = showPrediction;
        this.showLinear = showLinear;
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

export const DEFAULTPLAYER = new Player("TEST", "TESTPLAYER", undefined, 0, new Settings(5, true, false, false));
