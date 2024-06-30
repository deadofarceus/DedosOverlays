import { DeathEvent, FiveVFiveEvent, LeagueLPEvent, ModEvent } from "./BackendEvents";
import { Player } from "./DeathcounterTypes";
import { Game, Team } from "./FiveVFiveTypes";
import { AbisZAccount, Account, Match, QUEUETYPES } from "./LeagueTypes";
import { PCEvent } from "./PCTurnierTypes";

const GLOBALWSADRESS = "wss://modserver-dedo.glitch.me";
// const GLOBALWSADRESS = "ws://localhost:8080";

export abstract class BaseWebSocket<T> {
    callback: React.Dispatch<React.SetStateAction<T>>;
    ws: WebSocket;
    pingInterval!: NodeJS.Timeout;
    wsAddress: string;

    constructor(callback: React.Dispatch<React.SetStateAction<T>>, wsAddress: string) {
        this.callback = callback;
        this.wsAddress = wsAddress;
        this.ws = new WebSocket(this.wsAddress);

        this.setupWebSocket();
    }

    abstract handleMessage(event: MessageEvent): void;

    setupWebSocket() {
        if (this.ws.readyState === this.ws.CLOSED) {
            this.ws = new WebSocket(this.wsAddress);
        }
        this.ws.onopen = this.onOpenWrapper();
        this.ws.onclose = this.onCloseWrapper();
        this.ws.onerror = this.handleError;
        this.ws.onmessage = this.onMessageWrapper();
    }

    onMessageWrapper(): (event: MessageEvent) => void {
        return (event: MessageEvent) => {
            this.handleMessage(event);
        };
    }

    onCloseWrapper(): (ev: CloseEvent) => void {
        return (ev: CloseEvent) => {
            this.handleClose(ev);
        };
    }

    onOpenWrapper(): () => void {
        return () => {
            this.handleOpen();
        };
    }

    handleOpen = () => {
        console.log("WebSocket connection established.");
        this.setupPing();
        while (this.ws.readyState !== this.ws.OPEN) { /* empty */ }
    };

    handleClose = (ev: CloseEvent) => {
        if (ev.code !== 3500) {
            console.log("WebSocket connection closed. Attempting to reconnect...");
            clearInterval(this.pingInterval);
            setTimeout(() => this.setupWebSocket(), 5000);
        }
    };

    handleError = (error: Event) => {
        console.error("WebSocket error occurred:", error);
    };

    setupPing() {
        this.pingInterval = setInterval(() => this.ws.send("ping"), 60000);
    }

    sendEvent(modEvent: ModEvent) {
        this.ws.send(JSON.stringify(modEvent));
    }

    checkUtilityEvent(message: string) {
        if (message === "pong") return true;
        if (message === "refresh") {
            window.location.reload();
            return true;
        }
    }
}


export class EloWebsocket extends BaseWebSocket<Account> {

    summonerName: string;
    tag: string;
    key: string;
    queueID: number;
    ingame: boolean = false;

    constructor(summonerName: string, tag: string, key: string, queuetype: string, callback: React.Dispatch<React.SetStateAction<Account>>) {
        super(callback, `${GLOBALWSADRESS}?name=${summonerName}&tag=${tag}`);
        this.summonerName = summonerName;
        this.tag = tag;
        this.key = key;
        this.queueID = QUEUETYPES.get(queuetype)!.queueId;
    }

    handleOpen = () => {
        console.log("WebSocket connection established.");
        this.setupPing();
        while (this.ws.readyState !== this.ws.OPEN) { /* empty */ }
        this.sendListenEvent();
    };

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (this.checkUtilityEvent(message)) {
            return;
        }
        const data = JSON.parse(message);
        const account = data.accounts[0] as Account;
        console.log(account, Date.now().toLocaleString());

        account.lastThree = Array.from(
            new Set(account.lastThree.map((obj: Match) => JSON.stringify(obj)))
        ).map((str) => JSON.parse(str as string));

        while (account.lastThree.length > 5) {
            account.lastThree.shift();
        }

        // account.lastThree.reverse();

        if (!account.tier) {
            Object.assign(account, {
                hotstreak: false,
                leaguePoints: 0,
                tier: "UNRANKED",
                loses: 0,
                wins: 0,
                rank: "IV",
                combinedLP: 0,
                lpStart: 0
            });
        }

        this.callback(account);
    };

    sendListenEvent() {
        const leagueLPEvent = new LeagueLPEvent([new Account("", "", this.summonerName, this.tag, this.queueID)], this.key);
        const modEvent = new ModEvent("league/listenAccount", leagueLPEvent);
        this.sendEvent(modEvent);
    }

    requestUpdate() {
        const leagueLPEvent = new LeagueLPEvent([new Account("", "", this.summonerName, this.tag, this.queueID)], this.key);
        const modEvent = new ModEvent("league/manualUpdate", leagueLPEvent);
        this.sendEvent(modEvent);
    }
}

export class DeathCounterWebsocket extends BaseWebSocket<Player> {
    id: string;
    mod: boolean;

    constructor(id: string, callback: React.Dispatch<React.SetStateAction<Player>>, mod: boolean) {
        super(callback, `${GLOBALWSADRESS}?id=${id}`);
        this.id = id;
        this.callback = callback;
        this.mod = mod;
    }

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (this.checkUtilityEvent(message)) {
            return;
        }
        const data = JSON.parse(message);

        // console.log(data);

        const player = data.player as Player;

        localStorage.setItem(this.id + "EldenRingDeathcounter", JSON.stringify(player));

        if (!this.mod) {
            this.callback(player);
        }
    };

    sendData(player: Player): void {
        this.sendEvent(new ModEvent("fiveVfive", new DeathEvent(this.id, player)));
    }
}

export class FiveVFiveWebsocket extends BaseWebSocket<FiveVFiveEvent> {
    id: string;
    data: FiveVFiveEvent;

    constructor(id: string, callback: React.Dispatch<React.SetStateAction<FiveVFiveEvent>> | undefined) {
        super(callback!, `${GLOBALWSADRESS}?id=${id}`);
        this.id = id;
        this.data = new FiveVFiveEvent(id, new Team("Team 1", [], 0), new Team("Team 2", [], 0), "", "", "");
    }

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (this.checkUtilityEvent(message)) {
            return;
        }
        const data = JSON.parse(message);
        const FiveVFiveData = data as FiveVFiveEvent;

        if (this.callback) {
            this.callback(FiveVFiveData);
        }
    };

    gamePlayStatusChange(game: string, status: string, points: number) {
        this.data = { ...this.data, currentGame: "", bestof: "", standing: "" };

        switch (status) {
            case "Not played":
            case "Current Game":
                this.removeGame(this.data.teamB.wonGames, game);
                this.removeGame(this.data.teamA.wonGames, game);
                this.data.currentGame = status === "Current Game" ? game : "";
                break;
            case "Team 1 Gewinnt":
                this.removeGame(this.data.teamB.wonGames, game);
                if (!this.data.teamA.wonGames.find((g) => g.gameName === game)) {
                    this.data.teamA.wonGames.push(new Game(game, points));
                }
                break;
            case "Team 2 Gewinnt":
                this.removeGame(this.data.teamA.wonGames, game);
                if (!this.data.teamB.wonGames.find((g) => g.gameName === game)) {
                    this.data.teamB.wonGames.push(new Game(game, points));
                }
                break;
        }
        this.sendEvent(new ModEvent("fiveVfive", this.data));
    }

    gameFormatChange(format: string) {
        this.data.bestof = format;
        if (format === "BestOf3" || format === "BestOf5") {
            this.data.standing = "0 : 0"
        }
        this.sendEvent(new ModEvent("fiveVfive", this.data));
    }

    removeGame(wonGames: Game[], game: string) {
        if (wonGames.findIndex((g) => g.gameName === game) !== -1) {
            wonGames = wonGames.splice(wonGames.findIndex((g) => g.gameName === game), 1);
        }
    }

    sendStanding(standing: string): void {
        this.data.standing = standing;
        this.sendEvent(new ModEvent("fiveVfive", this.data));
    }
}

export class AbisZWebsocket extends BaseWebSocket<AbisZAccount> {
    id: string;

    constructor(id: string, callback: React.Dispatch<React.SetStateAction<AbisZAccount>>) {
        super(callback, `${GLOBALWSADRESS}?id=${id}`);
        this.id = id;
    }

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (this.checkUtilityEvent(message)) {
            return;
        }
        const data = JSON.parse(message);
        const account = data.account as AbisZAccount;
        console.log(Date.now().toLocaleString(), account);

        this.callback(account);
    };
}

export class PCTurnierWebsocket extends BaseWebSocket<PCEvent> {
    id: string;

    constructor(id: string, callback: React.Dispatch<React.SetStateAction<PCEvent>>) {
        super(callback, `${GLOBALWSADRESS}?id=${id}`);
        this.id = id;
    }

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (this.checkUtilityEvent(message)) {
            return;
        }

        const data = JSON.parse(message);
        const PCEventData = data as PCEvent;
        PCEventData.contenders.sort((a, b) => b.points - a.points);

        this.callback(PCEventData);
    };

    sendData(event: PCEvent) {
        event.id = this.id;
        this.sendEvent(new ModEvent("defaultDATA", event));
    }
}