import { Board } from "../../../types/gameshows/Jepoardy";
import { textQ, makeQuestion } from "./builders";

export const classic1: Board = {
  id: 1,
  extra: "default",
  categories: [
    {
      name: "Absolute Cinema",
      extra: "default",
      questions: [
        [
          textQ(
            55,
            "Richtig oder Falsch: Im OG Teaser Trailer ist der aller erste Champ, der uns gezeigt wird, Annie?",
            "Richtig",
            200,
            { category: "Absolute Cinema" },
          ),
        ],
        [
          textQ(
            56,
            "Im Cinematic 'A Twist of Fate' sehen wir einen Kampf zwischen Twisted Fate und welchem anderen Champion?",
            "Fiddlesticks",
            400,
            {
              category: "Absolute Cinema",
              answertype: "IMAGE",
              answer: "FiddleSticks.png",
            },
          ),
        ],
        [
          textQ(
            57,
            "Am 08.10.2013 wurde das erste offizielle Musikvideo von Riot veröffentlicht. Wie heißt dieses?",
            "Get Jinxed",
            600,
            { category: "Absolute Cinema" },
          ),
        ],
        [
          textQ(
            58,
            "Im Cinematic 'A New Dawn' sehen wir wie 2 Teams mit jeweils 5 Champions gegeneinander kämpfen. Welcher geht dabei zuerst down?",
            "Leona",
            800,
            {
              category: "Absolute Cinema",
              answertype: "IMAGE",
              answer: "Leona.png",
            },
          ),
        ],
        [
          textQ(
            59,
            "Welche Skinline hat als erstes einen Cinematic bekommen?",
            "Project",
            1000,
            {
              category: "Absolute Cinema",
              info: "09.09.2015 PROJEKT: OVERDRIVE. Vorher hat zwar DJ Sona einen Skin Trailer bekommen, ist aber keine Skinline.",
            },
          ),
        ],
      ],
    },
    {
      name: "Jahresrückblick",
      extra: "default",
      questions: [
        [
          textQ(
            60,
            "Die Summoner's Rift Map hat 2012 ein grafisches und technisches Update erhalten. Wann wurde sie komplett neu gemacht?",
            "2014",
            200,
            { category: "Jahresrückblick" },
          ),
        ],
        [
          textQ(61, "Wann wurden Vision Wards removed?", "2016", 400, {
            category: "Jahresrückblick",
            info: "Umgangssprachlich: Pink Wards",
          }),
        ],
        [
          textQ(
            62,
            "In welchem Jahr wurde Pulsefire Ezreal veröffentlicht?",
            "2012",
            600,
            { category: "Jahresrückblick" },
          ),
        ],
        [
          textQ(
            63,
            "In welchem Jahr gab es den Gamemode 'Hunt of the Blood Moon'?",
            "2017",
            800,
            {
              category: "Jahresrückblick",
              info: "Es gab ihn sogar zwei mal in dem Jahr.",
            },
          ),
        ],
        [
          textQ(
            64,
            "In welchem Jahr wurde Viktor veröffentlicht?",
            "2011",
            1000,
            {
              category: "Jahresrückblick",
              info: "29.12.2011",
            },
          ),
        ],
      ],
    },
    {
      name: "Iconic Skins",
      extra: "default",
      questions: [
        [
          textQ(
            65,
            "Welche beiden Skins hat man bekommen, wenn man eine physische Version des Spiels gekauft hat?",
            "Silver Kayle und Young Ryze",
            200,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              answer: "SilverRyze.png",
            },
          ),
        ],
        [
          textQ(
            66,
            "Wieso wurde Rusty Blitzcrank removed?",
            "Sah dem Standart Skin zu ähnlich",
            400,
            { category: "Iconic Skins" },
          ),
        ],
        [
          textQ(
            67,
            "Welcher war der erste Skin, den man bekommen hat, wenn man 10 Ranked Games gemacht hat?",
            "Judgement Kayle",
            600,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              answer: "JudgementKayle.png",
            },
          ),
        ],
        [
          textQ(
            68,
            "Wo konnte man den 'Riot Squad Singed' Skin erhalten?",
            "Gamescom 2010",
            800,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              answer: "RiotSquadSinged.png",
            },
          ),
        ],
        [
          textQ(
            69,
            "Ende 2018 gab es den ersten Prestige Skin. Welcher war das?",
            "Prestige K/DA Kai'Sa",
            1000,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              answer: "PrestigeKDAKaisa.png",
            },
          ),
        ],
      ],
    },
    {
      name: "Wie war das noch?",
      extra: "default",
      questions: [
        [
          makeQuestion({
            id: 70,
            category: "Wie war das noch?",
            points: 200,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 71,
            category: "Wie war das noch?",
            points: 400,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 72,
            category: "Wie war das noch?",
            points: 600,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 73,
            category: "Wie war das noch?",
            points: 800,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 74,
            category: "Wie war das noch?",
            points: 1000,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
      ],
    },
    {
      name: "Rate mal",
      extra: "default",
      questions: [
        [
          makeQuestion({
            id: 75,
            category: "Rate mal",
            points: 200,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 76,
            category: "Rate mal",
            points: 400,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 77,
            category: "Rate mal",
            points: 600,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 78,
            category: "Rate mal",
            points: 800,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
        [
          makeQuestion({
            id: 79,
            category: "Rate mal",
            points: 1000,
            type: "TEXT",
            question: "TBD",
            answer: "TBD",
          }),
        ],
      ],
    },
  ],
};
