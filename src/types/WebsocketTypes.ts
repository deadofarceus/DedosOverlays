import { DeathEvent, FiveVFiveEvent, LeagueLPEvent, ModEvent } from "./BackendEvents";
import { DeathData } from "./DeathTypes";
import { Team } from "./FiveVFiveTypes";
import { Account, Match, QUEUETYPES } from "./LeagueTypes";

export class EloWebsocket {

    summonerName: string;
    tag: string;
    key: string;
    callback: React.Dispatch<React.SetStateAction<Account>>;
    ws: WebSocket;
    wsAddress: string;
    queueID: number;
    pingInterval!: NodeJS.Timeout;
    gamefetchInterval!: NodeJS.Timeout;
    interval: number = 10000;
    ingame: boolean = false;

    constructor(summonerName: string, tag: string, key: string, queuetype: string, callback: React.Dispatch<React.SetStateAction<Account>>) {
        this.wsAddress = `wss://modserver-dedo.glitch.me?name=${summonerName}&tag=${tag}`;
        // this.wsAddress = `ws://localhost:8080?name=${summonerName}&tag=${tag}`;
        this.ws = new WebSocket(this.wsAddress);
        this.summonerName = summonerName;
        this.tag = tag;
        this.key = key;
        this.queueID = QUEUETYPES.get(queuetype)!.queueId;

        this.callback = callback;

        this.setupWebSocket();
    }

    setupWebSocket() {
        if (this.ws.readyState === this.ws.CLOSED) {
            this.ws = new WebSocket(this.wsAddress);
        }
        this.ws.onopen = this.handleOpen;
        this.ws.onclose = this.handleClose;
        this.ws.onerror = this.handleError;
        this.ws.onmessage = this.handleMessage;
    }

    async fetchIngameData() {
        await fetch("https://127.0.0.1:2999/liveclientdata/activeplayer", {
            mode: "no-cors"
        })
            .then(response => {
                // ingame
                if (response) this.ingame = true;
            })
            .catch(() => {
                // outgame
                if (this.ingame) {
                    //wechsel von ingame nach outgame make RIOTAPI Call
                    console.log("GAME FINISHED");
                    // this.sendAPIRequest();
                }
                this.ingame = false;
            });
    }

    handleOpen = () => {
        console.log("WebSocket connection established.");
        this.setupPing();
        while (this.ws.readyState !== this.ws.OPEN) { /* empty */ }
        this.sendListenEvent();
    };

    handleClose = (ev: CloseEvent) => {
        if (ev.code !== 3500) {
            console.log("WebSocket connection closed. Attempting to reconnect...");
            clearInterval(this.pingInterval);
            clearInterval(this.gamefetchInterval);
            setTimeout(() => this.setupWebSocket(), 5000);
        }
    };

    handleError = (error: Event) => {
        console.error("WebSocket error occurred:", error);
    };

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (message === "pong") return;
        if (message === "refresh") {
            window.location.reload();
            return;
        }
        const data = JSON.parse(message);
        const account = data.accounts[0] as Account;
        console.log(account, Date.now());

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

    setupPing() {
        this.pingInterval = setInterval(() => this.ws.send("ping"), 60000);
    }

    sendListenEvent() {
        const leagueLPEvent = new LeagueLPEvent([new Account("", "", this.summonerName, this.tag, this.queueID)], this.key);
        const modEvent = new ModEvent("league/listenAccount", leagueLPEvent);
        this.ws.send(JSON.stringify(modEvent));
    }
}

export class DeathCounterWebsocket {
    id: string;
    callback: React.Dispatch<React.SetStateAction<DeathData>>;
    ws: WebSocket;
    pingInterval!: NodeJS.Timeout;
    wsAddress: string;
    currentStats: DeathData;
    timerCallback: React.Dispatch<React.SetStateAction<number>>;

    constructor(id: string, deathData: DeathData, callback: React.Dispatch<React.SetStateAction<DeathData>>, setBosstimer: React.Dispatch<React.SetStateAction<number>>) {
        this.id = id;
        this.callback = callback;
        this.timerCallback = setBosstimer;
        this.wsAddress = `wss://modserver-dedo.glitch.me?id=${id}`;
        // this.wsAddress = `ws://localhost:8080?id=${id}`;

        this.ws = new WebSocket(this.wsAddress);

        this.currentStats = deathData;
        this.setupWebSocket();
    }

    setupWebSocket() {
        if (this.ws.readyState === this.ws.CLOSED) {
            this.ws = new WebSocket(this.wsAddress);
        }
        this.ws.onopen = this.handleOpen;
        this.ws.onclose = this.handleClose;
        this.ws.onerror = this.handleError;
        this.ws.onmessage = this.handleMessage;
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

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (message === "pong") return;
        if (message === "refresh") {
            window.location.reload();
            return;
        }
        const data = JSON.parse(message);

        const deathData = data.deathData as DeathData;

        this.currentStats = deathData;

        if (data.timerStart) {
            this.timerCallback!(data.timerStart);
        }
        this.callback(deathData);
    };

    setupPing() {
        this.pingInterval = setInterval(() => this.ws.send("ping"), 60000);
    }

    sendDeaths(timerStart: number) {

        const deathEvent = new DeathEvent(this.id, this.currentStats, timerStart!);
        const modEvent = new ModEvent("death/new", deathEvent);
        this.ws.send(modEvent.tostring());
    }

    sendData() {
        const deathEvent = new DeathEvent(this.id, this.currentStats, undefined!);
        const modEvent = new ModEvent("death/new", deathEvent);
        this.ws.send(modEvent.tostring());
    }

    changeDeaths(playerName: string, deathsNew: number) {
        this.currentStats.players.forEach(p => {
            if (p.playerName === playerName) {
                p.deaths = deathsNew;
            }
        });
        this.sendData();
    }

    changeName(playerName: string, playerNameValue: string) {
        this.currentStats.players.forEach(p => {
            if (p.playerName === playerName) {
                p.playerName = playerNameValue;
            }
        });
        this.sendData();
    }
}

export class FiveVFiveWebsocket {
    id: string;
    callback: React.Dispatch<React.SetStateAction<FiveVFiveEvent>> | undefined;
    ws: WebSocket;
    pingInterval!: NodeJS.Timeout;
    wsAddress: string;
    data: FiveVFiveEvent;

    constructor(id: string, callback: React.Dispatch<React.SetStateAction<FiveVFiveEvent>> | undefined) {
        this.id = id;
        this.callback = callback;
        // this.wsAddress = `wss://modserver-dedo.glitch.me?id=${id}`;
        this.wsAddress = `ws://localhost:8080?id=${id}`;

        this.data = new FiveVFiveEvent(id, new Team("Rot", []), new Team("Blau", []), "", "", "");
        this.ws = new WebSocket(this.wsAddress);

        this.setupWebSocket();
    }

    setupWebSocket() {
        if (this.ws.readyState === this.ws.CLOSED) {
            this.ws = new WebSocket(this.wsAddress);
        }
        this.ws.onopen = this.handleOpen;
        this.ws.onclose = this.handleClose;
        this.ws.onerror = this.handleError;
        this.ws.onmessage = this.handleMessage;
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

    handleMessage = (event: MessageEvent) => {
        const message = event.data;
        if (message === "pong") return;
        if (message === "refresh") {
            window.location.reload();
            return;
        }
        const data = JSON.parse(message);

        const FiveVFiveData = data.deathData as FiveVFiveEvent;

        console.log(FiveVFiveData);


        if (this.callback) {
            this.callback(FiveVFiveData);
        }
    };

    setupPing() {
        this.pingInterval = setInterval(() => this.ws.send("ping"), 60000);
    }

    sendData() {
        const modEvent = new ModEvent("fiveVfive", this.data);
        this.ws.send(modEvent.tostring());
    }

    gamePlayStatusChange(game: string, status: string) {
        switch (status) {
            case "Not played":
            case "Current Game":
                this.removeGame(this.data.teamB.wonGames, game);
                this.removeGame(this.data.teamA.wonGames, game);
                this.data.currentGame = status === "Current Game" ? game : "";
                this.data.bestof = "";
                this.data.standing = "";
                break;
            case "Team 1 Gewinnt":
                this.removeGame(this.data.teamB.wonGames, game);
                if (!this.data.teamA.wonGames.includes(game)) {
                    this.data.teamA.wonGames.push(game);
                }
                break;
            case "Team 2 Gewinnt":
                this.removeGame(this.data.teamA.wonGames, game);
                if (!this.data.teamB.wonGames.includes(game)) {
                    this.data.teamB.wonGames.push(game);
                }
                break;
        }
        this.sendData();
    }

    gameFormatChange(format: string) {
        this.data.bestof = format;
        if (format === "BestOf3" || format === "BestOf5") {
            this.data.standing = "0 : 0"
        }
        this.sendData();
    }

    removeGame(wonGames: string[], game: string) {
        if (wonGames.includes(game)) {
            wonGames = wonGames.splice(wonGames.indexOf(game), 1);
        }
    }

    sendStanding(standing: string): void {
        this.data.standing = standing;
        this.sendData();
    }
}