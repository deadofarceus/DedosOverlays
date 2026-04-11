export interface JepoardyGameState {
  admin: JepoardyAdmin;
  players: JepoardyPlayer[];
  boards: Board[];
  currentBoard: Board;
  currentQuestion: Question;
  currentPlayer: number;
  buzzerQueue: string[];
  password: string;
  state: "START" | "BOARD" | "QUESTION";
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
}

export interface JepoardyGameProps {
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
  clearBuzzer: () => void;
  clearOneBuzzer: (buzzer: string) => void;
  buzzerQueue: string[];
}

export interface JepoardyQuestionProps {
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
    extra: "DREHDASRAD",
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
            },
          ],
          [
            {
              id: 6,
              category: "LOL MEMES FÜR PROFIS",
              points: 200,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
            },
          ],
          [
            {
              id: 7,
              category: "LOL MEMES FÜR PROFIS",
              points: 300,
              type: "TEXT",
              state: "INVISIBLE",
              extra: "Active",
              question: "Wie viele Finger zeige ich?",
              answertype: "TEXT",
              answer: "5",
              finished: false,
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
            },
          ],
        ],
      },
    ],
  },
  currentQuestion: {
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
  },
  boards: [
    {
      id: 0,
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
              },
            ],
            [
              {
                id: 2,
                category: "Random",
                points: 200,
                type: "AUDIO",
                extra: "Corrupted",
                question: "Sona_Original_Laugh_0.ogg",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Sona",
                finished: false,
              },
            ],
            [
              {
                id: 2,
                category: "Random",
                points: 300,
                type: "VIDEO",
                extra: "Gold",
                question: "autophil_nocturne.mp4",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "Nocturne",
                finished: false,
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
              },
            ],
            [
              {
                id: 4,
                category: "Random",
                points: 500,
                type: "TEXT",
                extra: "Safezone",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                state: "INVISIBLE",
                answer: "5",
                finished: false,
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
                extra: "Taunt",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: true,
              },
            ],
            [
              {
                id: 6,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Windfury",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
              },
            ],
            [
              {
                id: 7,
                category: "Erkennen",
                points: 300,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Gold",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
              },
            ],
            [
              {
                id: 8,
                category: "Erkennen",
                points: 400,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Inactive",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
              },
            ],
            [
              {
                id: 9,
                category: "Erkennen",
                points: 500,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Safezone",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
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
              },
            ],
            [
              {
                id: 11,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Windfury",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
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
              },
            ],
            [
              {
                id: 16,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Windfury",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
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
              },
            ],
            [
              {
                id: 21,
                category: "Erkennen",
                points: 200,
                type: "TEXT",
                state: "INVISIBLE",
                extra: "Windfury",
                question: "Wie viele Finger zeige ich?",
                answertype: "TEXT",
                answer: "5",
                finished: false,
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
              },
            ],
          ],
        },
      ],
    },
  ],
  buzzerQueue: ["Krokoboss", "Kutcher", "Broeki", "TwoStone"],
};
