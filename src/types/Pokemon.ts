export interface PokemonEvent {
  type: "key" | "vdo" | "auth";
  data: any;
  token: string;
  userName?: string;
}

export interface PokemonInfos {
  userName: string;
}
