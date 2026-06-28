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
      image: "fiora/hud/fiora_circle_4.png",
    },
    {
      name: "Akali",
      revealed: false,
      image: "akali/hud/akali_circle_14.png",
    },
    {
      name: "Jax",
      revealed: false,
      image: "jax/hud/jax_circle_33.png",
    },
    {
      name: "Jinx",
      revealed: false,
      image: "jinx/hud/jinx_circle_20.png",
    },
    {
      name: "Quinn",
      revealed: false,
      image: "quinn/hud/quinn_circle_24.skins_quinn_skin24.png",
    },
    {
      name: "Sivir",
      revealed: false,
      image: "sivir/hud/sivir_circle_72.skins_sivir_skin72.png",
    },
    {
      name: "Pyke",
      revealed: false,
      image: "pyke/hud/pyke_circle_16.png",
    },
    {
      name: "Mordekaiser",
      revealed: false,
      image: "mordekaiser/hud/mordekaiser_circle_13.png",
    },
    {
      name: "Katarina",
      revealed: false,
      image: "katarina/hud/katarina_circle_9.png",
    },
    {
      name: "Irelia",
      revealed: false,
      image: "irelia/hud/irelia_circle_16.png",
    },
    {
      name: "Renekton",
      revealed: false,
      image: "renekton/hud/renekton_circle_26.png",
    },
    {
      name: "Gangplank",
      revealed: false,
      image: "gangplank/hud/gangplank_circle_33.png",
    },
    {
      name: "Naafiri",
      revealed: false,
      image: "naafiri/hud/naafiri_circle_11.png",
    },
    {
      name: "Ashe",
      revealed: false,
      image: "ashe/hud/ashe_circle_8.png",
    },
    {
      name: "Leona",
      revealed: false,
      image: "leona/hud/leona_circle_8.png",
    },
    {
      name: "Sylas",
      revealed: false,
      image: "sylas/hud/sylas_circle_13.png",
    },
    {
      name: "Yasuo",
      revealed: false,
      image: "yasuo/hud/yasuo_circle_2.png",
    },
    {
      name: "Lucian",
      revealed: false,
      image: "lucian/hud/lucian_circle_6.png",
    },
    {
      name: "Jhin",
      revealed: false,
      image: "jhin/hud/jhin_circle_4.png",
    },
    {
      name: "Master Yi",
      revealed: false,
      image: "masteryi/hud/masteryi_circle_9.png",
    },
    {
      name: "Sejuani",
      revealed: false,
      image: "sejuani/hud/sejuani_circle_16.png",
    },
    {
      name: "Zed",
      revealed: false,
      image: "zed/hud/zed_circle_3.png",
    },
    {
      name: "Ekko",
      revealed: false,
      image: "ekko/hud/ekko_circle_3.png",
    },
    {
      name: "Vi",
      revealed: false,
      image: "vi/hud/vi_circle_11.png",
    },
    {
      name: "Varus",
      revealed: false,
      image: "varus/hud/varus_circle_16.png",
    },
    {
      name: "Warwick",
      revealed: false,
      image: "warwick/hud/warwick_circle_16.png",
    },
    {
      name: "Senna",
      revealed: false,
      image: "senna/hud/senna_circle_16.png",
    },
    {
      name: "Vayne",
      revealed: false,
      image: "vayne/hud/vayne_circle_11.png",
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
      image: "ryze/hud/ryze_circle_0.png",
    },

    {
      name: "Master Yi",
      revealed: false,
      image: "masteryi/hud/masteryi_circle_0.png",
    },
    {
      name: "Fiddlesticks",
      revealed: false,
      image: "fiddlesticks/hud/fiddlesticks_circle_0.png",
    },
    {
      name: "Annie",
      revealed: false,
      image: "annie/hud/annie_circle.png",
    },
    {
      name: "Kayle",
      revealed: false,
      image: "kayle/hud/kayle_circle_0.png",
    },
    {
      name: "Teemo",
      revealed: false,
      image: "teemo/hud/teemo_circle_0.png",
    },
    {
      name: "Morgana",
      revealed: false,
      image: "morgana/hud/morgana_circle_0.png",
    },
    {
      name: "Alistar",
      revealed: false,
      image: "alistar/hud/alistar_circle.png",
    },
    {
      name: "Twisted Fate",
      revealed: false,
      image: "twistedfate/hud/twistedfate_circle_0.png",
    },
    {
      name: "Ashe",
      revealed: false,
      image: "ashe/hud/ashe_circle.png",
    },
    {
      name: "Sivir",
      revealed: false,
      image: "sivir/hud/sivir_circle_0.png",
    },
    {
      name: "Nunu & Willump",
      revealed: false,
      image: "nunu/hud/nunu_circle_0.png",
    },
    {
      name: "Sion",
      revealed: false,
      image: "sion/hud/sion_circle.png",
    },
    {
      name: "Warwick",
      revealed: false,
      image: "warwick/hud/warwick_circle_0.png",
    },
    {
      name: "Tristana",
      revealed: false,
      image: "tristana/hud/tristana_circle.png",
    },
    {
      name: "Soraka",
      revealed: false,
      image: "soraka/hud/soraka_circle.png",
    },
    {
      name: "Jax",
      revealed: false,
      image: "jax/hud/jax_circle_0.png",
    },
  ],
});

boards.push({
  id: 2,
  title: "Skins, die man mit Gemstones kaufen konnte",
  extra: "default",
  size: 136,
  objects: [
    {
      name: "Dragonwing Corki",
      revealed: false,
      image: "corki/hud/corki_circle_6.png",
    },
    {
      name: "Hextech Swain",
      revealed: false,
      image: "swain/hud/swain_circle_11.png",
    },
    {
      name: "Hextech Rammus",
      revealed: false,
      image: "rammus/hud/rammus_circle_16.png",
    },
    { name: "Dawnbringer Ward", revealed: false, image: "DawnbringerWard.png" },
    {
      name: "Hextech Nocturne",
      revealed: false,
      image: "nocturne/hud/nocturne_circle_16.png",
    },
    {
      name: "Hextech Annie",
      revealed: false,
      image: "annie/hud/annie_circle_10.png",
    },
    {
      name: "Lunar Wraith Caitlyn",
      revealed: false,
      image: "caitlyn/hud/caitlyn_circle_10.png",
    },
    {
      name: "Hextech Kassadin",
      revealed: false,
      image: "kassadin/hud/kassadin_circle_14.png",
    },
    {
      name: "Hextech Jarvan IV",
      revealed: false,
      image: "jarvaniv/hud/jarvaniv_circle_9.png",
    },
    {
      name: "Guqin Sona",
      revealed: false,
      image: "sona/hud/sona_circle_3.png",
    },
    {
      name: "Hextech Amumu",
      revealed: false,
      image: "amumu/hud/amumu_circle_23.png",
    },
    {
      name: "Hextech Ziggs",
      revealed: false,
      image: "ziggs/hud/ziggs_circle_23.png",
    },
    {
      name: "Soulstealer Vayne",
      revealed: false,
      image: "vayne/hud/vayne_circle_10.png",
    },
    {
      name: "War. King. Garen",
      revealed: false,
      image: "garen/hud/garen_circle_11.png",
    },
    {
      name: "Hextech Poppy",
      revealed: false,
      image: "poppy/hud/poppy_circle_15.png",
    },
    {
      name: "Nightbringer Ward",
      revealed: false,
      image: "NightbringerWard.png",
    },
    {
      name: "Hextech Alistar",
      revealed: false,
      image: "alistar/hud/alistar_circle_19.png",
    },
    {
      name: "Dragonblade Riven",
      revealed: false,
      image: "riven/hud/riven_circle_5.png",
    },
    {
      name: "Lancer Zero Hecarim",
      revealed: false,
      image: "hecarim/hud/hecarim_circle_7.png",
    },
    {
      name: "Hextech Sejuani",
      revealed: false,
      image: "sejuani/hud/sejuani_circle_15.png",
    },
    {
      name: "Dark Star Cho'Gath",
      revealed: false,
      image: "chogath/hud/chogath_circle_7.png",
    },
    {
      name: "Warr. King. Katarina",
      revealed: false,
      image: "katarina/hud/katarina_circle_8.png",
    },
    {
      name: "Hextech Kog'Maw",
      revealed: false,
      image: "kogmaw/hud/kogmaw_circle_10.png",
    },
    {
      name: "Neo Pax Sivir",
      revealed: false,
      image: "sivir/hud/sivir_circle_9.png",
    },
    {
      name: "Hextech Renekton",
      revealed: false,
      image: "renekton/hud/renekton_circle_17.png",
    },
    {
      name: "Hextech Tristana",
      revealed: false,
      image: "tristana/hud/tristana_circle_40.png",
    },
    { name: "Hextech Ward", revealed: false, image: "HextechWard.png" },
    {
      name: "Dreadnova Darius",
      revealed: false,
      image: "darius/hud/darius_circle_14.png",
    },
    {
      name: "Hextech Malzahar",
      revealed: false,
      image: "malzahar/hud/malzahar_circle_7.png",
    },
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
    {
      name: "Prestige Broken Covenant",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_41.png",
    },
    {
      name: "Candy Cane",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_4.png",
    },
    {
      name: "Battle Queen",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_60.png",
    },
    {
      name: "Ruined",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_21.png",
    },
    {
      name: "Admiral Battle Bunny",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_32.png",
    },
    {
      name: "Cowgirl",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_1.png",
    },
    {
      name: "Pajama Guardian",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_17.png",
    },
    {
      name: "Porcelain",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_50.png",
    },
    {
      name: "Crime City",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_6.png",
    },
    {
      name: "Gun Goddess",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_16_scarletfair.png",
    },
    {
      name: "Bewitching",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_18.png",
    },
    {
      name: "Secret Agent",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_3.png",
    },
    {
      name: "Road Warrior",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_5.png",
    },
    {
      name: "Star Guardian",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_15.png",
    },
    {
      name: "Waterloo",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_2.png",
    },
    {
      name: "Broken Covenant",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_40.png",
    },
    {
      name: "Pool Party",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_9.png",
    },
    {
      name: "Prestige Bewitching",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_20.png",
    },
    {
      name: "Arcade",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_7.png",
    },
    {
      name: "Prtg. Bew. (2022)",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_20.png",
    },
    {
      name: "Battle Bunny",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_31.png",
    },
    {
      name: "Captain",
      revealed: false,
      image: "missfortune/hud/missfortune_circle_8.png",
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
      lifes: 1,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      points: 0,
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
