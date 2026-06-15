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
      name: "Ashe",
      revealed: false,
    },
    {
      name: "Akali",
      revealed: false,
    },
    {
      name: "Ekko",
      revealed: false,
    },

    {
      name: "Fiora",
      revealed: false,
    },
    {
      name: "Gangplank",
      revealed: false,
    },
    {
      name: "Irelia",
      revealed: false,
    },
    {
      name: "Jax",
      revealed: false,
    },
    {
      name: "Jhin",
      revealed: false,
    },
    {
      name: "Jinx",
      revealed: false,
    },
    {
      name: "Katarina",
      revealed: false,
    },
    {
      name: "Leona",
      revealed: false,
    },
    {
      name: "Lucian",
      revealed: false,
    },
    {
      name: "Mordekaiser",
      revealed: false,
    },
    {
      name: "Master Yi",
      revealed: false,
    },
    {
      name: "Naafiri",
      revealed: false,
    },
    {
      name: "Sejuani",
      revealed: false,
    },
    {
      name: "Senna",
      revealed: false,
    },
    {
      name: "Sylas",
      revealed: false,
    },
    {
      name: "Varus",
      revealed: false,
    },
    {
      name: "Vayne",
      revealed: false,
    },
    {
      name: "Vi",
      revealed: false,
    },
    {
      name: "Warwick",
      revealed: false,
    },
    {
      name: "Yasuo",
      revealed: false,
    },
    {
      name: "Zed",
      revealed: false,
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
      name: "Alistar",
      revealed: false,
    },
    {
      name: "Annie",
      revealed: false,
    },
    {
      name: "Ashe",
      revealed: false,
    },

    {
      name: "Fiddlesticks",
      revealed: false,
    },
    {
      name: "Jax",
      revealed: false,
    },
    {
      name: "Kayle",
      revealed: false,
    },
    {
      name: "Master Yi",
      revealed: false,
    },
    {
      name: "Morgana",
      revealed: false,
    },
    {
      name: "Nunu & Willump",
      revealed: false,
    },
    {
      name: "Ryze",
      revealed: false,
    },
    {
      name: "Sion",
      revealed: false,
    },
    {
      name: "Sivir",
      revealed: false,
    },
    {
      name: "Soraka",
      revealed: false,
    },
    {
      name: "Teemo",
      revealed: false,
    },
    {
      name: "Tristana",
      revealed: false,
    },
    {
      name: "Twisted Fate",
      revealed: false,
    },
    {
      name: "Warwick",
      revealed: false,
    },
  ],
});

boards.push({
  id: 2,
  title: "Skins, die man mit Gemstones kaufen konnte",
  extra: "default",
  size: 137,
  objects: [
    {
      name: "Hextech Alistar",
      revealed: false,
    },
    {
      name: "Hextech Amumu",
      revealed: false,
    },
    {
      name: "Hextech Annie",
      revealed: false,
    },

    {
      name: "Dark Star Cho'Gath",
      revealed: false,
    },
    {
      name: "Dreadnova Darius",
      revealed: false,
    },
    {
      name: "Lancer Zero Hecarim",
      revealed: false,
    },
    {
      name: "Hextech Jarvan IV",
      revealed: false,
    },
    {
      name: "Hextech Kassadin",
      revealed: false,
    },
    {
      name: "Hextech Kog'Maw",
      revealed: false,
    },
    {
      name: "Hextech Malzahar",
      revealed: false,
    },
    {
      name: "Hextech Nocturne",
      revealed: false,
    },
    {
      name: "Hextech Poppy",
      revealed: false,
    },
    {
      name: "Hextech Rammus",
      revealed: false,
    },
    {
      name: "Hextech Renekton",
      revealed: false,
    },
    {
      name: "Hextech Sejuani",
      revealed: false,
    },
    {
      name: "Hextech Swain",
      revealed: false,
    },
    {
      name: "Hextech Tristana",
      revealed: false,
    },
    {
      name: "Soulstealer Vayne",
      revealed: false,
    },
    {
      name: "Hextech Ziggs",
      revealed: false,
    },
    {
      name: "Hextech Ward",
      revealed: false,
    },
    {
      name: "Neo Pax Sivir",
      revealed: false,
    },
    {
      name: "Dawnbringer Ward",
      revealed: false,
    },
    {
      name: "Nightbringer Ward",
      revealed: false,
    },
    {
      name: "Lunar Wraith Caitlyn",
      revealed: false,
    },
    {
      name: "Dragonwing Corki",
      revealed: false,
    },
    {
      name: "Warring Kingdoms Garen",
      revealed: false,
    },
    {
      name: "Warring Kingdoms Katarina",
      revealed: false,
    },
    {
      name: "Guqin Sona",
      revealed: false,
    },
    {
      name: "Dragonblade Riven",
      revealed: false,
    },
  ],
});

boards.push({
  id: 3,
  title: "18 teuerste Legendary Items",
  extra: "default",
  size: 164,
  objects: [
    {
      name: "Infinity Edge",
      revealed: false,
    },
    {
      name: "Rabadon's Deathcap",
      revealed: false,
    },
    {
      name: "Bloodthirster",
      revealed: false,
    },

    {
      name: "Trinity Force",
      revealed: false,
    },
    {
      name: "Overlord's Bloodmail",
      revealed: false,
    },
    {
      name: "Lord Dominik's Regards",
      revealed: false,
    },
    {
      name: "Ravenous Hydra",
      revealed: false,
    },
    {
      name: "Titanic Hydra",
      revealed: false,
    },
    {
      name: "Death's Dance",
      revealed: false,
    },
    {
      name: "Stridebreaker",
      revealed: false,
    },
    {
      name: "Zhonya's Hourglass",
      revealed: false,
    },
    {
      name: "Bastionbreaker",
      revealed: false,
    },
    {
      name: "Guardian Angel",
      revealed: false,
    },
    {
      name: "Sterak's Gage",
      revealed: false,
    },
    {
      name: "Mercurial Schimitar",
      revealed: false,
    },
    {
      name: "Blade of The Ruined King",
      revealed: false,
    },
    {
      name: "Shadowflame",
      revealed: false,
    },
    {
      name: "Jak'Sho",
      revealed: false,
    },
  ],
});

boards.push({
  id: 4,
  title: "Miss Fortune Skins",
  extra: "default",
  size: 136,
  objects: [
    {
      name: "Cowgirl",
      revealed: false,
    },
    {
      name: "Waterloo",
      revealed: false,
    },
    {
      name: "Crime City",
      revealed: false,
    },

    {
      name: "Arcade",
      revealed: false,
    },
    {
      name: "Captain",
      revealed: false,
    },
    {
      name: "Pool Party",
      revealed: false,
    },
    {
      name: "Star Guardian",
      revealed: false,
    },
    {
      name: "Gun Goddess",
      revealed: false,
    },
    {
      name: "Pajama Guardian",
      revealed: false,
    },
    {
      name: "Ruined",
      revealed: false,
    },
    {
      name: "Battle Bunny",
      revealed: false,
    },
    {
      name: "Broken Covenant",
      revealed: false,
    },
    {
      name: "Porcelain",
      revealed: false,
    },
    {
      name: "Battle Queen",
      revealed: false,
    },
    {
      name: "Secret Agent",
      revealed: false,
    },
    {
      name: "Candy Cane",
      revealed: false,
    },
    {
      name: "Road Warrior",
      revealed: false,
    },
    {
      name: "Bewitching",
      revealed: false,
    },
    {
      name: "Prestige Bewitching",
      revealed: false,
    },
    {
      name: "Admiral Battle Bunny",
      revealed: false,
    },
    {
      name: "Prestige Bewitching (2022)",
      revealed: false,
    },
    {
      name: "Prestige Broken Covenant",
      revealed: false,
    },
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
