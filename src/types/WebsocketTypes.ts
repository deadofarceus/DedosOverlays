import { LeagueLPEvent, ModEvent } from "./BackendEvents";
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
        console.log(this.queueID);

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