import { DeathData } from "./DeathTypes";
import { Account } from "./LeagueTypes";


class ModEvent {
    type: string;
    data: unknown;

    constructor(type: string, data: unknown) {
        this.type = type;
        this.data = data;
    }

    public tostring(): string {
        return JSON.stringify(this);
    }
}

class VoteEvent {
    channel: string;
    voteNumber: number;
    id: string;

    constructor(id: string, channel: string, voteNumber: number) {
        this.id = id;
        this.channel = channel;
        this.voteNumber = voteNumber;
    }
}

class BingoEvent {
    id: string;
    channel: string;
    bingoCards: string;
    mega: number;

    constructor(id: string, channel: string, bingoCards: string, mega: number) {
        this.id = id;
        this.channel = channel;
        this.bingoCards = bingoCards;
        this.mega = mega;
    }
}

class VotingControlEvent {
    id: string;
    channel: string;
    control: string;
    constructor(id: string, channel: string, control: string) {
        this.id = id;
        this.channel = channel;
        this.control = control;
    }
}

class LOLBingoEvent {
    id: string;
    channel: string;
    bingoCards: string;

    constructor(id: string, channel: string, bingoCards: string) {
        this.id = id;
        this.channel = channel;
        this.bingoCards = bingoCards;
    }
}

class ControlEvent {
    id: string;
    message: string;

    constructor(id: string, message: string) {
        this.id = id;
        this.message = message;
    }
}

class WatchEvent {
    id: string;
    chatMessage: string;

    constructor(id: string, chatMessage: string) {
        this.id = id;
        this.chatMessage = chatMessage;
    }
}

export class LeagueLPEvent {
    accounts: Account[];
    key: string;

    constructor(accounts: Account[], key: string) {
        this.accounts = accounts;
        this.key = key;
    }
}

export class DeathEvent {
    id: string;
    deathData: DeathData;
    constructor(id: string, deathData: DeathData) {
        this.deathData = deathData;
        this.id = id;
    }
}

export { ModEvent, VoteEvent, BingoEvent, VotingControlEvent, LOLBingoEvent, ControlEvent, WatchEvent }