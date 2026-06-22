export interface LMSGameState {
  admin: LMSAdmin;
  players: LMSPlayer[];
  boards: LMSBoard[];
  currentBoard: number;
  currentPlayer: number;
  password: string;
  round: Round;
}

export interface Round {
  participants: LMSPlayer[];
  results: Result[];
}

export interface Result {
  playerName: string;
  rightAnswer: boolean;
  lifes: number;
}

export interface LMSAdmin {
  name: string;
  vdoNinjaLink: string;
}

export interface LMSPlayer {
  name: string;
  points: number;
  lifes: number;
  vdoNinjaLink: string;
}

export interface LMSBoard {
  id: number;
  title: string;
  extra?: string;
  objects: LMSObject[];
  size: number;
}

export interface LMSObject {
  name: string;
  revealed: boolean;
  extra?: string;
  image?: string;
}

export const boards: LMSBoard[] = [];

boards.push({
  id: 0,
  title: "Project Skins",
  extra: "default",
  size: 137,
  objects: [
    {
      name: "Fiora",
      revealed: false,
      image: "Fiora_4",
    },
    {
      name: "Akali",
      revealed: false,
      image: "Akali_14",
    },
    {
      name: "Jax",
      revealed: false,
      image: "Jax_33",
    },
    {
      name: "Jinx",
      revealed: false,
      image: "Jinx_20",
    },
    {
      name: "Mordekaiser",
      revealed: false,
      image: "Mordekaiser_6",
    },
    {
      name: "Katarina",
      revealed: false,
      image: "Katarina_9",
    },
    {
      name: "Irelia",
      revealed: false,
      image: "Irelia_16",
    },
    {
      name: "Gangplank",
      revealed: false,
      image: "Gangplank_33",
    },
    {
      name: "Naafiri",
      revealed: false,
      image: "Naafiri_11",
    },
    {
      name: "Ashe",
      revealed: false,
      image: "Ashe_8",
    },
    {
      name: "Leona",
      revealed: false,
      image: "Leona_8",
    },
    {
      name: "Sylas",
      revealed: false,
      image: "Sylas_13",
    },
    {
      name: "Yasuo",
      revealed: false,
      image: "Yasuo_2",
    },
    {
      name: "Lucian",
      revealed: false,
      image: "Lucian_6",
    },
    {
      name: "Jhin",
      revealed: false,
      image: "Jhin_4",
    },
    {
      name: "Master Yi",
      revealed: false,
      image: "MasterYi_9",
    },
    {
      name: "Sejuani",
      revealed: false,
      image: "Sejuani_16",
    },
    {
      name: "Zed",
      revealed: false,
      image: "Zed_3",
    },
    {
      name: "Ekko",
      revealed: false,
      image: "Ekko_3",
    },
    {
      name: "Vi",
      revealed: false,
      image: "Vi_11",
    },
    {
      name: "Varus",
      revealed: false,
      image: "Varus_16",
    },
    {
      name: "Warwick",
      revealed: false,
      image: "Warwick_16",
    },
    {
      name: "Senna",
      revealed: false,
      image: "Senna_16",
    },
    {
      name: "Vayne",
      revealed: false,
      image: "Vayne_11",
    },
  ],
});

boards.push({
  id: 1,
  title: "LOL Alpha Champs",
  extra: "default",
  size: 163,
  objects: [
    {
      name: "Ryze",
      revealed: false,
      image: "Ryze_0",
    },

    {
      name: "Master Yi",
      revealed: false,
      image: "MasterYi_0",
    },
    {
      name: "Fiddlesticks",
      revealed: false,
      image: "Fiddlesticks_0",
    },
    {
      name: "Annie",
      revealed: false,
      image: "Annie_0",
    },
    {
      name: "Kayle",
      revealed: false,
      image: "Kayle_0",
    },
    {
      name: "Teemo",
      revealed: false,
      image: "Teemo_0",
    },
    {
      name: "Morgana",
      revealed: false,
      image: "Morgana_0",
    },
    {
      name: "Alistar",
      revealed: false,
      image: "Alistar_0",
    },
    {
      name: "Twisted Fate",
      revealed: false,
      image: "TwistedFate_0",
    },
    {
      name: "Ashe",
      revealed: false,
      image: "Ashe_0",
    },
    {
      name: "Sivir",
      revealed: false,
      image: "Sivir_0",
    },
    {
      name: "Nunu & Willump",
      revealed: false,
      image: "Nunu_0",
    },
    {
      name: "Sion",
      revealed: false,
      image: "Sion_0",
    },
    {
      name: "Warwick",
      revealed: false,
      image: "Warwick_0",
    },
    {
      name: "Tristana",
      revealed: false,
      image: "Tristana_0",
    },
    {
      name: "Soraka",
      revealed: false,
      image: "Soraka_0",
    },
    {
      name: "Jax",
      revealed: false,
      image: "Jax_0",
    },
  ],
});

boards.push({
  id: 2,
  title: "Skins, die man mit Gemstones kaufen konnte",
  extra: "default",
  size: 137,
  objects: [
    { name: "Dragonwing Corki", revealed: false, image: "Corki_6" },
    { name: "Hextech Swain", revealed: false, image: "Swain_11" },
    { name: "Hextech Rammus", revealed: false, image: "Rammus_16" },
    { name: "Dawnbringer Ward", revealed: false, image: "DawnbringerWard.png" },
    { name: "Hextech Nocturne", revealed: false, image: "Nocturne_16" },
    { name: "Hextech Annie", revealed: false, image: "Annie_10" },
    { name: "Lunar Wraith Caitlyn", revealed: false, image: "Caitlyn_10" },
    { name: "Hextech Kassadin", revealed: false, image: "Kassadin_14" },
    { name: "Hextech Jarvan IV", revealed: false, image: "JarvanIV_9" },
    { name: "Guqin Sona", revealed: false, image: "Sona_4" },
    { name: "Hextech Amumu", revealed: false, image: "Amumu_23" },
    { name: "Hextech Ziggs", revealed: false, image: "Ziggs_23" },
    { name: "Soulstealer Vayne", revealed: false, image: "Vayne_10" },
    { name: "Warring Kingdoms Garen", revealed: false, image: "Garen_11" },
    { name: "Hextech Poppy", revealed: false, image: "Poppy_15" },
    { name: "Nightbringer Ward", revealed: false, image: "NightbringerWard.png" },
    { name: "Hextech Alistar", revealed: false, image: "Alistar_19" },
    { name: "Dragonblade Riven", revealed: false, image: "Riven_5" },
    { name: "Lancer Zero Hecarim", revealed: false, image: "Hecarim_7" },
    { name: "Hextech Sejuani", revealed: false, image: "Sejuani_15" },
    { name: "Dark Star Cho'Gath", revealed: false, image: "Chogath_7" },
    { name: "Warring Kingdoms Katarina", revealed: false, image: "Katarina_8" },
    { name: "Hextech Kog'Maw", revealed: false, image: "KogMaw_10" },
    { name: "Neo Pax Sivir", revealed: false, image: "Sivir_9" },
    { name: "Hextech Renekton", revealed: false, image: "Renekton_17" },
    { name: "Hextech Tristana", revealed: false, image: "Tristana_40" },
    { name: "Hextech Ward", revealed: false, image: "HextechWard.png" },
    { name: "Dreadnova Darius", revealed: false, image: "Darius_14" },
    { name: "Hextech Malzahar", revealed: false, image: "Malzahar_7" },
  ],
});

boards.push({
  id: 3,
  title: "18 teuerste Legendary Items",
  extra: "default",
  size: 164,
  objects: [
    { name: "Zhonya's Hourglass", revealed: false, image: "3157" },
    { name: "Shadowflame", revealed: false, image: "4645" },
    { name: "Ravenous Hydra", revealed: false, image: "223074" },
    { name: "Mercurial Scimitar", revealed: false, image: "3139" },
    { name: "Infinity Edge", revealed: false, image: "223031" },
    { name: "Bastionbreaker", revealed: false, image: "2520" },
    { name: "Death's Dance", revealed: false, image: "226333" },
    { name: "Blade of The Ruined King", revealed: false, image: "3153" },
    { name: "Sterak's Gage", revealed: false, image: "3053" },
    { name: "Trinity Force", revealed: false, image: "3078" },
    { name: "Lord Dominik's Regards", revealed: false, image: "223036" },
    { name: "Guardian Angel", revealed: false, image: "3026" },
    { name: "Overlord's Bloodmail", revealed: false, image: "447111" },
    { name: "Titanic Hydra", revealed: false, image: "223748" },
    { name: "Stridebreaker", revealed: false, image: "226631" },
    { name: "Rabadon's Deathcap", revealed: false, image: "223089" },
    { name: "Jak'Sho", revealed: false, image: "6665" },
    { name: "Bloodthirster", revealed: false, image: "3072" },
  ],
});

boards.push({
  id: 4,
  title: "Miss Fortune Skins",
  extra: "default",
  size: 136,
  objects: [
    { name: "Prestige Broken Covenant", revealed: false, image: "MissFortune_41" },
    { name: "Candy Cane", revealed: false, image: "MissFortune_4" },
    { name: "Battle Queen", revealed: false, image: "MissFortune_60" },
    { name: "Ruined", revealed: false, image: "MissFortune_21" },
    { name: "Admiral Battle Bunny", revealed: false, image: "MissFortune_32" },
    { name: "Cowgirl", revealed: false, image: "MissFortune_1" },
    { name: "Pajama Guardian", revealed: false, image: "MissFortune_17" },
    { name: "Porcelain", revealed: false, image: "MissFortune_50" },
    { name: "Crime City", revealed: false, image: "MissFortune_6" },
    { name: "Gun Goddess", revealed: false, image: "MissFortune_16" },
    { name: "Bewitching", revealed: false, image: "MissFortune_18" },
    { name: "Secret Agent", revealed: false, image: "MissFortune_3" },
    { name: "Road Warrior", revealed: false, image: "MissFortune_5" },
    { name: "Star Guardian", revealed: false, image: "MissFortune_15" },
    { name: "Waterloo", revealed: false, image: "MissFortune_2" },
    { name: "Broken Covenant", revealed: false, image: "MissFortune_40" },
    { name: "Pool Party", revealed: false, image: "MissFortune_9" },
    { name: "Prestige Bewitching", revealed: false, image: "MissFortune_20" },
    { name: "Arcade", revealed: false, image: "MissFortune_7" },
    { name: "Prtg. Bew. (2022)", revealed: false, image: "MissFortune_33" },
    { name: "Battle Bunny", revealed: false, image: "MissFortune_31" },
    { name: "Captain", revealed: false, image: "MissFortune_8" },
  ],
});

export const TESTGamestate: LMSGameState = {
  password: "test",
  admin: {
    name: "Autophil",
    vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
  },
  currentPlayer: 0,
  players: [
    {
      name: "Krokoboss",
      lifes: 3,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      points: 10,
    },
    {
      name: "Kutcher",
      lifes: 2,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      points: 20,
    },
    {
      name: "Broeki",
      lifes: 1,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      points: 9,
    },
    {
      name: "TwoStone",
      lifes: 1,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      points: 2,
    },
  ],
  round: {
    participants: [
      {
        name: "Krokoboss",
        lifes: 3,
        vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
        points: 0,
      },
      {
        name: "Kutcher",
        lifes: 2,
        vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
        points: 0,
      },
      {
        name: "Broeki",
        lifes: 1,
        vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
        points: 0,
      },
      {
        name: "TwoStone",
        lifes: 0,
        vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
        points: 0,
      },
    ],
    results: [],
  },
  boards: boards,
  currentBoard: 0,
};
