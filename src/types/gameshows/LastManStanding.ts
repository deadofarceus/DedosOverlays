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
}

export interface LMSObject {
  name: string;
  revealed: boolean;
  extra?: string;
}

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
  boards: [
    {
      id: 0,
      title: "Zufällige Champs",
      extra: "default",
      objects: [
        {
          name: "Nasus",
          revealed: false,
        },
        {
          name: "Shyvana",
          revealed: false,
        },
        {
          name: "Viego",
          revealed: false,
        },
        {
          name: "Zilean",
          revealed: false,
        },
        {
          name: "Sona",
          revealed: false,
        },
        {
          name: "Pyke",
          revealed: false,
        },
        {
          name: "Taliyah",
          revealed: false,
        },
        {
          name: "Quinn",
          revealed: false,
        },
        {
          name: "Alistar",
          revealed: false,
        },
        {
          name: "Amumu",
          revealed: false,
        },
      ],
    },
    {
      id: 1,
      title: "ZWEITES BOARD",
      extra: "default",
      objects: [
        {
          name: "Nasus2",
          revealed: false,
        },
        {
          name: "Shyvana2",
          revealed: false,
        },
        {
          name: "Viego2",
          revealed: false,
        },
        {
          name: "Zilean2",
          revealed: false,
        },
        {
          name: "Sona2",
          revealed: false,
        },
        {
          name: "Pyke2",
          revealed: false,
        },
        {
          name: "Taliyah2",
          revealed: false,
        },
        {
          name: "Quinn2",
          revealed: false,
        },
        {
          name: "Alistar2",
          revealed: false,
        },
        {
          name: "Amumu2",
          revealed: false,
        },
      ],
    },
  ],
  currentBoard: 0,
};
