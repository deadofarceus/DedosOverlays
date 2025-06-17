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
  routes: Route[];
  trainers: Trainer[];
  settings: Settings;
}

export class Route {
  name: string;
  pokemon: Pokemon[];
  disabled: boolean = false;
  inTeam: boolean = false;
  constructor(name: string, trainer: Trainer[]) {
    this.name = name;
    this.pokemon = [];
    trainer.forEach((t) => {
      this.pokemon.push(new Pokemon("1", "Bulbasaur", "Bisasam", "Bulbasaur", name, t.name));
    });
  }
}

export interface Trainer {
  name: string;
  team: Pokemon[];
}

export class Pokemon {
  id: string;
  name: string;
  nameDE: string;
  nickName: string;
  image: string;
  routeName: string;
  trainerName: string;
  constructor(
    id: string,
    name: string,
    nameDE: string,
    nickName: string,
    routeName: string,
    trainerName: string
  ) {
    this.id = id;
    this.name = name;
    this.nameDE = nameDE;
    this.nickName = nickName;
    this.routeName = routeName;
    this.trainerName = trainerName;
    this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}

export interface Settings {
  imgType: "png" | "gif";
  showPokeballs: boolean;
  showNicknames: boolean;
}
