export class PCEvent {
    id: string;
    contenders: PCPlayer[]
    constructor(id: string, contenders: PCPlayer[]) {
        this.id = id;
        this.contenders = contenders;
    }
}

export class PCPlayer {
    name: string;
    points: number;
    rank: number = 0;
    constructor(name: string, points: number) {
        this.name = name;
        this.points = points;
    }
}

export const BLANKDATA: PCEvent = {
    id: "TEST",
    contenders: [
        { name: "PLAYER 1", points: 18, rank: 0 },
        { name: "PLAYER 2", points: 2, rank: 0 },
        { name: "PLAYER 3", points: 12, rank: 0 },
        { name: "PLAYER 4", points: 14, rank: 0 },
        { name: "PLAYER 5", points: 6, rank: 0 },
        { name: "PLAYER 6", points: 12, rank: 0 },
        { name: "PLAYER 7", points: 10, rank: 0 },
        { name: "PLAYER 8", points: 4, rank: 0 },
        { name: "PLAYER 9", points: 22, rank: 0 },
        { name: "PLAYER 10", points: 22, rank: 0 },
        { name: "PLAYER 11", points: 22, rank: 0 },
        { name: "PLAYER 12", points: 22, rank: 0 },
        { name: "PLAYER 13", points: 22, rank: 0 },
        { name: "PLAYER 14", points: 22, rank: 0 },
        { name: "PLAYER 15", points: 22, rank: 0 },
        { name: "PLAYER 16", points: 22, rank: 0 },
    ]
} 