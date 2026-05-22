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
      this.pokemon.push(
        new Pokemon("1", "Bulbasaur", "Bisasam", "-----------------", name, t.name)
      );
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
  participants: 1 | 2 | 3;
}

export const TRAINER_DEFAULT_NAMES = ["Ash", "Misty", "Brock"] as const;
export const TRAINER_COLORS = ["#00e1ff", "#ffa600", "#b84dff"] as const;

export const DEFAULT_SOULLINK_SETTINGS: Settings = {
  imgType: "png",
  showPokeballs: true,
  showNicknames: false,
  participants: 2,
};

export function createDefaultTrainers(): Trainer[] {
  return TRAINER_DEFAULT_NAMES.map((name) => ({ name, team: [] }));
}

export function ensureTrainers(trainers: Trainer[]): Trainer[] {
  const result = [...trainers];
  while (result.length < 3) {
    result.push({ name: TRAINER_DEFAULT_NAMES[result.length], team: [] });
  }
  return result;
}

export function normalizeSettings(
  settings?: Partial<Settings> & { playSoullink?: boolean }
): Settings {
  if (!settings) {
    return { ...DEFAULT_SOULLINK_SETTINGS };
  }
  let participants: Settings["participants"] = DEFAULT_SOULLINK_SETTINGS.participants;
  if (settings.participants === 1 || settings.participants === 2 || settings.participants === 3) {
    participants = settings.participants;
  } else if ("playSoullink" in settings) {
    participants = settings.playSoullink ? 2 : 1;
  }
  return {
    imgType: settings.imgType ?? DEFAULT_SOULLINK_SETTINGS.imgType,
    showPokeballs: settings.showPokeballs ?? DEFAULT_SOULLINK_SETTINGS.showPokeballs,
    showNicknames: settings.showNicknames ?? DEFAULT_SOULLINK_SETTINGS.showNicknames,
    participants,
  };
}

export function activeTrainers(trainers: Trainer[], participants: Settings["participants"]): Trainer[] {
  return trainers.slice(0, participants);
}

export function activeRoutePokemon(
  route: Route,
  participants: Settings["participants"]
): Pokemon[] {
  return route.pokemon.slice(0, participants);
}

const MINI_ROUTE_PKMN_CLASSES = ["firstTrainerPkmn", "secondTrainerPkmn", "thirdTrainerPkmn"] as const;

export function miniRoutePokemonClass(index: number): string {
  return MINI_ROUTE_PKMN_CLASSES[index] ?? "thirdTrainerPkmn";
}
