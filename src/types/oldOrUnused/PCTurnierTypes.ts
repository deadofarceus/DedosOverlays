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
    ]
} 