export interface ClientD {
    client: WSClient;
}

export interface WSClient {
    uuid: string;
    id: string;
    summonerName: string;
    tagline: string;
    queueId: number;
    key: string;
    region: string;
}