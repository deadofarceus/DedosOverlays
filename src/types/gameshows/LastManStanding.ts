export interface LMSGameState {
  admin: LMSAdmin;
  players: LMSPlayer[];
  boards: LMSBoard[];
  currentBoard: number;
  currentPlayer: number;
  password: string;
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
  ],
  currentBoard: 0,
};
