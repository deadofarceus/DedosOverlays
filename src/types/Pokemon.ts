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
  trainer: Trainer[];
}

export class Route {
  name: string;
  pokemon: Pokemon[];
  trainer: Trainer[];
  constructor(name: string, trainer: Trainer[]) {
    this.name = name;
    this.pokemon = [];
    this.trainer = trainer;
    trainer.forEach((trainer) => {
      this.pokemon.push(new Pokemon("1", "Bulbasaur", "Bisasam", this, trainer));
    });
  }

  // wird nie benutzt hoffentlich
  addTrainer(trainer: Trainer) {
    this.trainer.push(trainer);
    this.pokemon.push(new Pokemon("1", "Bulbasaur", "Bisasam", this, trainer));
  }
}

export interface Trainer {
  name: string;
  pokemon: Pokemon[];
  team: Pokemon[];
}

export class Pokemon {
  id: string;
  name: string;
  deName: string;
  image: string;
  route: Route;
  trainer: Trainer;
  constructor(id: string, name: string, deName: string, route: Route, trainer: Trainer) {
    this.id = id;
    this.name = name;
    this.deName = deName;
    this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    this.route = route;
    this.trainer = trainer;
  }
}
