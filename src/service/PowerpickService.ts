import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient, ChatMessage } from "@twurple/chat";

export interface Pick {
  champion: string;
  votes: number;
  voters: string[];
}

export class PowerpickService {
  clientID: string;
  accessToken: string;
  powerpicks: Pick[] = [];
  listening: boolean = false;
  onVote: (powerpicks: Pick[]) => void;

  constructor(clientID: string, accessToken: string, onVote: (powerpicks: Pick[]) => void) {
    this.clientID = clientID;
    this.accessToken = accessToken;
    this.onVote = onVote;

    this.connect();
  }

  async connect() {
    const authProvider = new StaticAuthProvider(this.clientID, this.accessToken);
    const broadcaster = await this.getTwitchUser(this.accessToken);
    const chatClient = new ChatClient({
      authProvider,
      channels: [broadcaster],
    });

    chatClient.onMessage(this.onMessage.bind(this));

    chatClient.connect();
    console.log("Connected");
  }

  startVoting(champions: Pick[]) {
    if (this.listening) {
      this.stopVoting();
      return;
    }
    this.powerpicks = champions;
    this.listening = true;
  }

  stopVoting() {
    this.listening = false;
  }

  onMessage(_channel: string, user: string, text: string, _msg: ChatMessage) {
    if (!this.listening) {
      return;
    }
    if (text.split(" ").length > 1) {
      return;
    }

    if (this.removeOtherVotes(user)) {
      return;
    }

    for (const pick of this.powerpicks) {
      if (pick.champion.toLowerCase() === text.toLowerCase()) {
        pick.votes++;
        pick.voters.push(user);
        this.onVote(this.powerpicks);
        return;
      }
    }
  }

  removeOtherVotes(user: string) {
    return this.powerpicks.some((pick) => pick.voters.includes(user));
  }

  chooseWinner() {
    const winnerpick = this.powerpicks.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );

    const winner = winnerpick.voters[Math.floor(Math.random() * winnerpick.voters.length)];
    // const winner = "GEWINNER_0815";
    return winner;
  }

  async getTwitchUser(token: string): Promise<string> {
    try {
      const response = await fetch(`https://id.twitch.tv/oauth2/validate`, {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Token validation failed with status: ${response.status}`);
        return "";
      }

      const data = await response.json();
      if (!data.login) {
        console.error("Invalid response from Twitch API");
        return "";
      }

      return data.login;
    } catch (error) {
      console.error("Error validating token:", error);
      return "";
    }
  }
}
