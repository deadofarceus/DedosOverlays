export interface PokemonEvent {
  type: "key" | "vdo" | "auth";
  data: any;
  token: string;
}
