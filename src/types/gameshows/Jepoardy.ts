export interface JepoardyGameState {
  admin: JepoardyAdmin;
  players: JepoardyPlayer[];
  boards: Board[];
  currentBoard: Board;
  currentQuestion: Question;
  currentPlayer: number;
  currentRandomQuestions: Question[];
  buzzerQueue: string[];
  password: string;
  state: "START" | "BOARD" | "QUESTION" | "RANDOMQUESTION";
}

export interface JepoardyAdmin {
  name: string;
  vdoNinjaLink: string;
}

export interface JepoardyPlayer {
  name: string;
  points: number;
  vdoNinjaLink: string;
  turn: boolean;
  buzzed: boolean;
}

export interface Board {
  id: number;
  categories: Category[];
  extra: "default" | "forced" | "DREHDASRAD"; // das ist so cheaten haha this is going to backfire 100%
}

export interface Category {
  name: string;
  extra: "default" | "forced";
  questions: Question[][];
}

export interface Question {
  id: number;
  category: string;
  points: number;
  type: "AUDIO" | "IMAGE" | "TEXT" | "VIDEO";
  extra: "Active" | "Taunt" | "Windfury" | "Gold" | "Inactive" | "Safezone" | "Corrupted";
  question: string;
  answertype: "VIDEO" | "TEXT";
  answer: string;
  state: "PAUSED" | "INVISIBLE" | "ACTIVE";
  finished: boolean;
  buzzedPlayers: JepoardyPlayer[];
  info?: string;
}

export interface JepoardyGameProps {
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
  clearBuzzer: () => void;
  clearOneBuzzer: (buzzer: string) => void;
  buzzerQueue: string[];
}

export interface JepoardyQuestionProps {
  questions: Question[];
  sendState: (newState: JepoardyGameState) => void;
  gamestate: JepoardyGameState;
}

export interface JepoardySingleQuestionProps {
  question: Question;
  sendState: (newState: JepoardyGameState) => void;
  gamestate: JepoardyGameState;
}

export const TESTGamestate: JepoardyGameState = {
  password: "test",
  admin: {
    name: "Autophil",
    vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
  },
  currentPlayer: 1,
  players: [
    {
      name: "Krokoboss",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "Kutcher",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "Broeki",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
    {
      name: "TwoStone",
      points: 0,
      vdoNinjaLink: "https://vdo.ninja/?view=HqEPyCb",
      turn: false,
      buzzed: false,
    },
  ],
  state: "BOARD",
  currentBoard: {
    id: 1,
    extra: "default",
    categories: [
      {
        name: "RANDOM",
        extra: "default",
        questions: [
          [
            {
              id: 1,
              category: "Random",
              points: 100,
              type: "TEXT",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              state: "INVISIBLE",
              answer: "5",
              finished: true,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 2,
              category: "Random",
              points: 200,
              type: "AUDIO",
              extra: "Active",
              question: "Sona_Original_Laugh_0.ogg",
              answertype: "TEXT",
              state: "INVISIBLE",
              answer: "Sona",
              finished: true,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 2,
              category: "Random",
              points: 300,
              type: "VIDEO",
              extra: "Active",
              question: "autophil_nocturne.mp4",
              answertype: "TEXT",
              state: "INVISIBLE",
              answer: "Nocturne",
              finished: true,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 3,
              category: "Random",
              points: 400,
              type: "IMAGE",
              extra: "Active",
              question: "Aatrox.jpg",
              answertype: "TEXT",
              state: "INVISIBLE",
              answer: "Aatrox",
              finished: true,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 4,
              category: "Random",
              points: 500,
              type: "TEXT",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              state: "INVISIBLE",
              answer: "5",
              finished: true,
              buzzedPlayers: [],
            },
          ],
        ],
      },
      {
        name: "LOL MEMES FÜR PROFIS",
        extra: "default",
        questions: [
          [
            {
              id: 5,
              category: "LOL MEMES FÜR PROFIS",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: true,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 6,
              category: "LOL MEMES FÜR PROFIS",
              points: 200,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Windfury",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 7,
              category: "LOL MEMES FÜR PROFIS",
              points: 300,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Windfury",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 8,
              category: "LOL MEMES FÜR PROFIS",
              points: 400,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 9,
              category: "LOL MEMES FÜR PROFIS",
              points: 500,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
        ],
      },
      {
        name: "CHAMPION",
        extra: "forced",
        questions: [
          [
            {
              id: 10,
              category: "CHAMPION",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 11,
              category: "CHAMPION",
              points: 200,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 12,
              category: "CHAMPION",
              points: 300,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 13,
              category: "CHAMPION",
              points: 400,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 14,
              category: "CHAMPION",
              points: 500,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
        ],
      },
      {
        name: "DINGE DIE PHIL MAG",
        extra: "default",
        questions: [
          [
            {
              id: 15,
              category: "DINGE DIE PHIL MAG",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Brust",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
              info: "Brust",
            },
            {
              id: 15,
              category: "DINGE DIE PHIL MAG",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Augen",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
              info: "Augen",
            },
            {
              id: 15,
              category: "DINGE DIE PHIL MAG",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Lippen",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
              info: "Lippen",
            },
            {
              id: 15,
              category: "DINGE DIE PHIL MAG",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Hand",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
              info: "Hand",
            },
            {
              id: 15,
              category: "DINGE DIE PHIL MAG",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Irgendwas",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
              info: "Irgendwas",
            },
          ],
          [
            {
              id: 16,
              category: "Erkennen",
              points: 200,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 17,
              category: "Erkennen",
              points: 300,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 18,
              category: "Erkennen",
              points: 400,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 19,
              category: "Erkennen",
              points: 500,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
        ],
      },
      {
        name: "KATEGORIE",
        extra: "default",
        questions: [
          [
            {
              id: 20,
              category: "Erkennen",
              points: 100,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 21,
              category: "Erkennen",
              points: 200,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 22,
              category: "Erkennen",
              points: 300,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 23,
              category: "Erkennen",
              points: 400,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
          [
            {
              id: 24,
              category: "Erkennen",
              points: 500,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
              buzzedPlayers: [],
            },
          ],
        ],
      },
    ],
  },
  currentRandomQuestions: [
    {
      id: 5,
      category: "Erkennen",
      points: 100,
      type: "TEXT",
      state: "ACTIVE",
      extra: "Active",
      question: "Wie viele Finger zeige ich?",
      answertype: "TEXT",
      answer: "5",
      finished: true,
      buzzedPlayers: [],
    },
  ],
  currentQuestion: {
    id: -1,
    category: "START",
    points: 100,
    type: "TEXT",
    state: "ACTIVE",
    extra: "Active",
    question: "STARTFRAGE",
    answertype: "TEXT",
    answer: "START",
    finished: true,
    buzzedPlayers: [],
  },
  boards: [
    {
      id: 0,
      extra: "default",
      categories: [
        {
          name: "Jhin",
          extra: "default",
          questions: [
            [
              {
                id: 1,
                category: "Jhin",
                points: 444,
                type: "TEXT",
                extra: "Active",
                question: "Nenne 4 Champs, die von den Shadow Isles kommen",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer:
                  "Elise, Gwen, Hecarim, Kalista, Karthus, Maokai, Thresh, Vex, Viego, Yorick",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 2,
                category: "Jhin",
                points: 444,
                type: "TEXT",
                extra: "Active",
                question: "Nenne 4 Champs mit einer Revive Mechanic",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Akshan, Zilean, Renata, Zaahen, Zac, Anivia",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 2,
                category: "Jhin",
                points: 444,
                type: "VIDEO",
                extra: "Active",
                question: "Nenne 4 Yordle Champs",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer:
                  "Corki, Fizz, Gnar, Heimerdinger, Kennen, Kled, Lulu, Poppy, Rumble, Teemo, Tristana, Veigar, Ziggs",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 3,
                category: "Jhin",
                points: 444,
                type: "TEXT",
                extra: "Active",
                question: "Nenne die 4 neusten Champs",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Zaahen, Yunara, Mel, Ambessa",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 4,
                category: "Jhin",
                points: 444,
                type: "TEXT",
                extra: "Active",
                question: "Nenne 4 Champs, die im 'Still here' Musikvideo auftreten",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Tryndamere, Kindred, Yasuo, Morgana, Kayle, Aatrox, Ashe",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "LOL",
          extra: "default",
          questions: [
            [
              {
                id: 5,
                category: "LOL",
                points: 100,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Sona_Original_Laugh_0.ogg",
                answertype: "TEXT",
                answer: "Sona",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 6,
                category: "LOL",
                points: 200,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Pyke_Original_Laugh_0.ogg",
                answertype: "TEXT",
                answer: "Pyke",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 7,
                category: "LOL",
                points: 300,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Taliyah_Original_Laugh_0.ogg",
                answertype: "TEXT",
                answer: "Taliyah",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 8,
                category: "LOL",
                points: 400,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Quinn_Original_Laugh_0.ogg",
                answertype: "TEXT",
                answer: "Quinn",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 9,
                category: "LOL",
                points: 500,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Alistar_Original_Laugh_1.ogg",
                answertype: "TEXT",
                answer: "Alistar",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "Sound Themes",
          extra: "default",
          questions: [
            [
              {
                id: 10,
                category: "Sound Themes",
                points: 200,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Kaisa.mp3",
                answertype: "TEXT",
                answer: "Kai'sa",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 11,
                category: "Sound Themes",
                points: 400,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "NunuWillump.mp3",
                answertype: "TEXT",
                answer: "Nunu & Willump",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 12,
                category: "Sound Themes",
                points: 600,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "MorgKayle.mp3",
                answertype: "TEXT",
                answer: "Morgana & Kayle",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 13,
                category: "Sound Themes",
                points: 800,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "XayahRakan.mp3",
                answertype: "TEXT",
                answer: "Xayah & Rakan",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 14,
                category: "Sound Themes",
                points: 1000,
                type: "AUDIO",
                state: "INVISIBLE",
                extra: "Active",
                question: "Skarner.mp3",
                answertype: "TEXT",
                answer: "Skarner",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "One Sentence Lore",
          extra: "default",
          questions: [
            [
              {
                id: 15,
                category: "One Sentence Lore",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question:
                  "Dieser Champ durchquert die Welt, weil er einen Freund finden will, aber ein Fluch macht es ihm unmöglich",
                answertype: "TEXT",
                answer: "Amumu",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 16,
                category: "One Sentence Lore",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question:
                  "Dieser Champ war eigentlich nur ein Fabelwesen, das Kindern Angst machen sollte, doch wurde real",
                answertype: "TEXT",
                answer: "Fiddlesticks",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 17,
                category: "One Sentence Lore",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question:
                  "Der gesuchte Champ ist laut Lore mit folgenden Champs verknüpft: Ornn, Udyr, Anivia, Volibear",
                answertype: "TEXT",
                answer: "Aurora",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 18,
                category: "One Sentence Lore",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question:
                  "Dieser Champ sollte eine politische Ehe eingehen, weigerte sich und brachte anschließend den eigenen Vater um",
                answertype: "TEXT",
                answer: "Fiora",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 19,
                category: "One Sentence Lore",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question:
                  "Dieser Champ entdeckte die eigenen Fähigkeiten durch Wut und aus dem Wunsch heraus nie wieder kontrolliert zu werden",
                answertype: "TEXT",
                answer: "Syndra",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "Imposter",
          extra: "default",
          questions: [
            [
              {
                id: 20,
                category: "Imposter",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: `Diese Champs nutzen Mana als Ressource: 
                  Aatrox, Ahri, Alistar, Amumu, Anivia`,
                answertype: "TEXT",
                answer: "Aatrox (Manaless)",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 21,
                category: "Imposter",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: `Diese Champs haben in Arcane mitgespielt:
                  Vi, Ambessa, Ekko, Renata, Heimerdinger`,
                answertype: "TEXT",
                answer: "Renata",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 22,
                category: "Imposter",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: `Diese Champs 10 Skins oder mehr (Default nicht mitgezählt) (Stand:19.04.26): 
                  Malzahar, Nasus, Nidalee, Pyke, Lissandra`,
                answertype: "TEXT",
                answer: "Malzahar (13), Nasus (13), Nidalee (16), Pyke (12), Lissandra (9)",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 23,
                category: "Imposter",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: `Diese Champs haben einen Legacy Valentinstag Skin:
                  Rakan, Yuumi, Nami, Annie, Sona`,
                answertype: "TEXT",
                answer:
                  "Rakan (Sweetheart), Yuumi (Heartseeker), Nami (nein), Annie (Sweetheart), Sona (Sweetheart)",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 24,
                category: "Imposter",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: `Diese Champs haben einen Attackspeed von mindestens 0,65 (Patch 26.01): 
                  Katarina, Maokai, Sejuani, Xerath, Lucian`,
                answertype: "TEXT",
                answer:
                  "Katarina (0,658), Maokai (0,8), Sejuani (0,688), Xerath (0,658), Lucian (0,638)",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
      ],
    },
    {
      id: 1,
      extra: "default",
      categories: [
        {
          name: "RANDOM",
          extra: "default",
          questions: [
            [
              {
                id: 1,
                category: "Random",
                points: 100,
                type: "TEXT",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 2,
                category: "Random",
                points: 200,
                type: "AUDIO",
                extra: "Active",
                question: "Sona_Original_Laugh_0.ogg",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Sona",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 2,
                category: "Random",
                points: 300,
                type: "VIDEO",
                extra: "Active",
                question: "autophil_nocturne.mp4",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Nocturne",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 3,
                category: "Random",
                points: 400,
                type: "IMAGE",
                extra: "Active",
                question: "Aatrox.jpg",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Aatrox",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 4,
                category: "Random",
                points: 500,
                type: "TEXT",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "LOL MEMES FÜR PROFIS",
          extra: "default",
          questions: [
            [
              {
                id: 5,
                category: "Erkennen",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 6,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 7,
                category: "Erkennen",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 8,
                category: "Erkennen",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 9,
                category: "Erkennen",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "CHAMPION",
          extra: "forced",
          questions: [
            [
              {
                id: 10,
                category: "Erkennen",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 11,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 12,
                category: "Erkennen",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 13,
                category: "Erkennen",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 14,
                category: "Erkennen",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "DINGE DIE PHIL MAG",
          extra: "default",
          questions: [
            [
              {
                id: 15,
                category: "Erkennen",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 16,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 17,
                category: "Erkennen",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 18,
                category: "Erkennen",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 19,
                category: "Erkennen",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
        {
          name: "KATEGORIE",
          extra: "default",
          questions: [
            [
              {
                id: 20,
                category: "Erkennen",
                points: 100,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 21,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 22,
                category: "Erkennen",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 23,
                category: "Erkennen",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
            [
              {
                id: 24,
                category: "Erkennen",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Active",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
                buzzedPlayers: [],
              },
            ],
          ],
        },
      ],
    },
  ],
  buzzerQueue: [],
};
