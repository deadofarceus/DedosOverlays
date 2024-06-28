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

export const DEFAULTPLAYER = new Player("TEST", "TESTPLAYER", [{
    name: "TESTRADAHNDASD", deaths: [
        100,
        90,
        98,
        99,
        96,
        97,
        94,
        97,
        98,
        96,
        98,
        97,
        95,
        90,
        95,
        94,
        89,
        96,
        94,
        83,
        100,
        87,
        98,
        95,
        96,
        89,
        93,
        97,
        83,
        81,
        81,
        85,
        96,
        95,
        93,
        91,
        92,
        79,
        97,
        92,
        91,
        94,
        91,
        98,
        96,
        96,
        76,
        92,
        89,
        95,
        96,
        85,
        84,
        90,
        97,
        92,
        98,
        94,
        82,
        86,
        82,
        94,
        97,
        87,
        94,
        65,
        94,
        95,
        78,
        74,
        89,
        69,
        99,
        100,
        66,
        92,
        90,
        65,
        65,
        77,
        90,
        96,
        71,
        87,
        91,
        85,
        93,
        70,
        86,
        95,
        94,
        97,
        87,
        91,
        96,
        97,
        82,
        60,
        85,
        90,
        87,
        71,
        93,
        72,
        86,
        95,
        91,
        96,
        98,
        96,
        96,
        96,
        97,
        66,
        72,
        88,
        97,
        88
    ], secondPhase: false
}], 0, 5, false);
