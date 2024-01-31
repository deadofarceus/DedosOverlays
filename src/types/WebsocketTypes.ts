import { ModEvent } from "./BackendEvents";
import { Account } from "./LeagueTypes";

export class EloWebsocket extends WebSocket {

    pingInterval: number = 0;
    summonerName: string;
    tag: string;
    key: string;
    callback: React.Dispatch<React.SetStateAction<Account>>;

    constructor(summonerName: string, tag: string, key: string, callback: React.Dispatch<React.SetStateAction<Account>>) {
        super(`wss://modserver-dedo.glitch.me?name=${summonerName}&tag=${tag}`);
        this.summonerName = summonerName;
        this.tag = tag;
        this.key = key;
        this.callback = callback;

        this.setupWebSocket();

    }

    setupWebSocket() {
        this.onopen = this.handleOpen;
        this.onclose = this.handleClose;
        this.onerror = this.handleError;
        this.onmessage = this.handleMessage;
    }

    handleOpen = () => {
        console.log("WebSocket connection established.");
        this.setupPing();
        this.sendModEvent();
    };

    handleClose = (ev: CloseEvent) => {
        console.log(ev.reason);

        if (ev.code !== 3500) {
            console.log("WebSocket connection closed. Attempting to reconnect...");
            this.reconnect();
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
        const account = data.accounts[0];
        console.log(account);
        account.lastThree.reverse();
        this.callback(account);
    };

    setupPing() {
        this.pingInterval = setInterval(() => this.send("ping"), 60000);
    }

    sendModEvent() {
        const modEvent = new ModEvent("league/listenAccount", {
            summonerName: this.summonerName,
            tag: this.tag,
            key: this.key,
        });
        this.send(JSON.stringify(modEvent));
    }

    reconnect() {
        setTimeout(this.setupWebSocket.bind(this), 3000);
    }
}