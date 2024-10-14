import { StaticAuthProvider } from "@twurple/auth";
import { Chatter } from "../types/GuessTheSubTypes";
import { ChatClient, ChatMessage } from "@twurple/chat";
import { ApiClient, HelixChatBadgeSet } from "@twurple/api";

export class BraveryService {
  clientID: string;
  accessToken: string;
  broadcaster: Chatter = new Chatter("", "", "", false, "");
  chatter: Chatter = new Chatter("", "", "", false, "");
  subIDs: string[] = [];
  isSubNeeded: boolean = true;
  subBadgeUrls: string[] = [];
  chatters: Chatter[] = [];
  champIconURL: string = "";
  allChampions: string[] = [];
  channelBadges: HelixChatBadgeSet[] = [];
  globalBadges: HelixChatBadgeSet[] = [];

  constructor(clientID: string, accessToken: string) {
    this.clientID = clientID;
    this.accessToken = accessToken;
    this.loadChamps();
  }

  loadChamps() {
    fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.champIconURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/`;
        for (const champ in data.data) {
          this.allChampions.push(champ);
        }
      });
  }

  async getStreamer() {
    const res = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: "Bearer " + this.accessToken,
        "Client-Id": this.clientID,
      },
    }).then((res) => res.json());
    this.broadcaster = new Chatter(
      res.data[0].id,
      res.data[0].display_name,
      res.data[0].profile_image_url,
      true,
      ""
    );
    await this.getSubBadges();
  }

  async getSubBadges() {
    const url = new URL("https://api.twitch.tv/helix/chat/badges");
    url.searchParams.append("broadcaster_id", this.broadcaster.id);

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Client-Id": this.clientID,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const data = await response.json();

      this.subBadgeUrls = data.data
        .filter((badge: any) => badge.set_id === "subscriber")
        .flatMap((badge: any) =>
          badge.versions.map((version: any) => version.image_url_2x)
        );

      console.log(`${this.subBadgeUrls.length} Subbadge-URLs gefunden.`);
      if (this.subBadgeUrls.length === 0) {
        this.subBadgeUrls.push(
          "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
        );
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Subbadges:", error);
    }
  }

  getBadge(): string {
    return this.subBadgeUrls[
      Math.floor(Math.random() * this.subBadgeUrls.length)
    ];
  }

  async connectToChat(
    messageDispenser: (message: ChatMessage) => void,
    parties: (partys: number) => void
  ) {
    const authProvider = new StaticAuthProvider(
      this.clientID,
      this.accessToken
    );
    const chatClient = new ChatClient({
      authProvider,
      channels: [this.broadcaster.name],
    });
    const apiClient = new ApiClient({ authProvider });
    this.channelBadges = await apiClient.chat.getChannelBadges(
      this.broadcaster.id
    );
    this.globalBadges = await apiClient.chat.getGlobalBadges();
    chatClient.connect();
    console.log("Connected");

    chatClient.onMessage(
      async (
        _channel: string,
        _user: string,
        _text: string,
        msg: ChatMessage
      ) => {
        if (
          (msg.text === "!chatbravery" && msg.userInfo.isSubscriber) ||
          !this.isSubNeeded
        ) {
          const existingChatter = this.chatters.find(
            (chatter) => chatter.name === msg.userInfo.displayName
          );
          if (!existingChatter) {
            let badge = "";
            msg.userInfo.badges.forEach((version: string, id: string) => {
              if (id === "subscriber") {
                badge = this.channelBadges
                  .find((b) => b.id === id)
                  ?.getVersion(version)
                  ?.getImageUrl(4)!;
                return;
              } else {
                badge = this.globalBadges
                  .find((b) => b.id === id)
                  ?.getVersion(version)
                  ?.getImageUrl(4)!;
                return;
              }
            });
            if (!badge) {
              badge = this.getBadge();
            }
            this.chatters.push(
              new Chatter(
                msg.userInfo.userId,
                msg.userInfo.displayName,
                "",
                msg.userInfo.isSubscriber,
                badge
              )
            );
            console.log(this.chatters);

            parties(this.chatters.length);
          }
        }
        if (this.chatter.name === msg.userInfo.displayName) {
          messageDispenser(msg);
        }
      }
    );
  }

  getRandomChatter() {
    const rc = this.chatters[Math.floor(Math.random() * this.chatters.length)];
    this.chatter = rc;
    return rc;
  }

  checkChamps(msg: ChatMessage): string {
    const text = msg.text.toLowerCase();
    const words = text.split(" ");
    let closestDistance = 2;
    let foundChamp = "";
    for (const word of words) {
      for (const champ of this.allChampions) {
        const dis = this.editingDistance(word, champ);
        if (dis < closestDistance) {
          closestDistance = dis;
          foundChamp = champ;
        }
      }
    }
    if (foundChamp) {
      return this.champIconURL + foundChamp + "_0.jpg";
    } else {
      return "";
    }
  }

  editingDistance(searchWord: string, originalWord: string): number {
    const dp: number[][] = Array(searchWord.length + 1)
      .fill(null)
      .map(() => Array(originalWord.length + 1).fill(0));

    for (let i = 0; i <= searchWord.length; i++) {
      for (let j = 0; j <= originalWord.length; j++) {
        if (i === 0) {
          dp[i][j] = j; // If searchWord is empty, insert all characters of originalWord
        } else if (j === 0) {
          dp[i][j] = i; // If originalWord is empty, remove all characters of searchWord
        } else if (searchWord[i - 1] === originalWord[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]; // No operation needed
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Deletion
            dp[i][j - 1] + 1, // Insertion
            dp[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }
    return dp[searchWord.length][originalWord.length];
  }
}
