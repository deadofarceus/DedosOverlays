import { Chatter } from "../types/GuessTheChatterTypes";

export class TwitchService {
  clientID: string;
  accessToken: string;
  broadcaster: Chatter = new Chatter("", "", "", false);
  subIDs: string[] = [];
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
      true
    );
    await this.getAllSubs();
  }

  async getAllChatters() {
    return await fetch(
      `https://api.twitch.tv/helix/chat/chatters?broadcaster_id=${this.broadcaster.id}&moderator_id=${this.broadcaster.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Client-Id": this.clientID,
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching chatters:", error));
  }

  isSubscriber(userID: string) {
    return this.subIDs.includes(userID);
  }

  async getAllSubs() {
    let cursor: string | null = null;
    do {
      const url = new URL("https://api.twitch.tv/helix/subscriptions");
      url.searchParams.append("broadcaster_id", this.broadcaster.id);
      url.searchParams.append("first", "100"); // Maximale Anzahl pro Anfrage
      if (cursor) {
        url.searchParams.append("after", cursor);
      }

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Client-Id": this.clientID,
        },
      }).then((res) => res.json());

      if (res.data) {
        for (const user of res.data) {
          this.subIDs.push(user.user_id);
        }
      }

      cursor = res.pagination?.cursor || null;
    } while (cursor);

    console.log(`Insgesamt ${this.subIDs.length} Abonnenten gefunden.`);
  }
}
