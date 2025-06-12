export interface PokemonEvent {
  type: "key" | "vdo" | "auth";
  data: any;
  token: string;
  userName?: string;
}

export interface PokemonInfos {
  userName: string;
}

export interface Soullink {
  id: string;
  trainers: Trainer[];
}

export interface Trainer {
  name: string;
  pokemon: Pokemon[];
}

export class Pokemon {
  id: string;
  name: string;
  deName: string;
  image: string;
  route: string;
  constructor(id: string, name: string, deName: string, route: string) {
    this.id = id;
    this.name = name;
    this.deName = deName;
    this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    this.route = route;
  }
}
