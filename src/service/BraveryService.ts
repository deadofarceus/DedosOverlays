import { StaticAuthProvider } from "@twurple/auth";
import { Chatter } from "../types/GuessTheSubTypes";
import { ChatClient, ChatMessage } from "@twurple/chat";

export class BraveryService {
  clientID: string;
  accessToken: string;
  broadcaster: Chatter = new Chatter("", "", "", false, "");
  chatter: Chatter = new Chatter("", "", "", false, "");
  subIDs: string[] = [];
  subBadgeUrls: string[] = [];
  chatters: Chatter[] = [];

  constructor(clientID: string, accessToken: string) {
    this.clientID = clientID;
    this.accessToken = accessToken;
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

  connectToChat(
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
          msg.text === "!chatbravery" &&
          !this.chatters.some((c) => c.name === msg.userInfo.displayName) &&
          msg.userInfo.isSubscriber
        ) {
          this.chatters.push(
            new Chatter(
              msg.userInfo.userId,
              msg.userInfo.displayName,
              "",
              msg.userInfo.isSubscriber,
              this.getBadge()
            )
          );
          parties(this.chatters.length);
        }
        if (this.chatter.name === msg.userInfo.displayName) {
          messageDispenser(msg);
        }
      }
    );
  }

  getRandomChatter() {
    return this.chatters[Math.floor(Math.random() * this.chatters.length)];
  }
}
