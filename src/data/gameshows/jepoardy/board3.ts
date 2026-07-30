import { Board } from "../../../types/gameshows/Jepoardy";
import { textQ } from "./builders";

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
            {
              category: "Absolute Cinema",
              answertype: "IMAGE",
              alternateAnswer: "Annie",
              answer: "Annie.png",
            },
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
              alternateAnswer: "Fiddlesticks",
              answer: "Fiddlesticks_Classic.png",
            },
          ),
        ],
        [
          textQ(
            57,
            "Am 08.10.2013 wurde das erste offizielle Musikvideo von Riot veröffentlicht. Wie heißt dieses?",
            "Get Jinxed",
            600,
            {
              category: "Absolute Cinema",
              answertype: "IMAGE",
              alternateAnswer: "Get Jinxed",
              answer: "Get_Jinxed.png",
            },
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
              alternateAnswer: "Leona",
              answer: "LeonaClassic.png",
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
              answertype: "IMAGE",
              alternateAnswer: "PROJECT",
              answer: "ProjectSkins.png",
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
            "Nenne einen der beiden Skins, die man erhalten hat, wenn man eine physische Version des Spiels gekauft hat.",
            "Silver Kayle und Young Ryze",
            200,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              alternateAnswer: "Young Ryze und Silver Kayle",
              answer: "YoungRyzeUndSilverKayle.jpg",
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
              alternateAnswer: "Judgement Kayle",
              answer: "Judgement_Kayle.jpg",
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
              alternateAnswer: "Prestige K/DA Kai'Sa",
              answer: "KDA_Kaisa_Prestige_Edition.jpg",
            },
          ),
        ],
      ],
    },
    {
      name: "AI explains",
      extra: "default",
      questions: [
        [
          textQ(
            70,
            "Das war der, der nach einem Kill den Champion oder sogar den Drake als Pet mitgenommen hat.",
            "Mordekaiser",
            200,
            {
              category: "AI explains",
              answertype: "IMAGE",
              alternateAnswer: "Mordekaiser",
              answer: "MordekaiserClassic.jpg",
            },
          ),
        ],
        [
          textQ(
            71,
            "Das war die, die ihre Ulti einfach als vier fliegende Klingen verschossen hat.",
            "Irelia",
            400,
            {
              category: "AI explains",
              answertype: "IMAGE",
              alternateAnswer: "Irelia",
              answer: "IreliaClassic.jpg",
            },
          ),
        ],
        [
          textQ(
            72,
            "Das war der, der dich markiert hat, seine Raketen plötzlich um Wände geflogen sind und dann einfach den Platz mit dir getauscht hat.",
            "Urgot",
            600,
            {
              category: "AI explains",
              answertype: "IMAGE",
              alternateAnswer: "Urgot",
              answer: "UrgotClassic.jpg",
            },
          ),
        ],
        [
          textQ(
            73,
            "Das war der, der zwischen Schaden und Heilung umgeschaltet hat und nach dem Tod einfach wieder aufgestanden ist.",
            "Aatrox",
            800,
            {
              category: "AI explains",
              answertype: "IMAGE",
              alternateAnswer: "Aatrox",
              answer: "AatroxClassic.jpg",
            },
          ),
        ],
        [
          textQ(
            74,
            "Das war der, der dich angesprungen und gefühlt eine Ewigkeit lang festgehalten hat.",
            "Warwick",
            1000,
            {
              category: "AI explains",
              answertype: "IMAGE",
              alternateAnswer: "Warwick",
              answer: "WarwickClassic.jpg",
            },
          ),
        ],
      ],
    },
    {
      name: "Impostor",
      extra: "default",
      questions: [
        [
          textQ(
            75,
            "Champs, die einen eigenen Login Screen hatten:\n      Yunara, Jhin, Thresh, Galio, Urgot",
            "Yunara",
            200,
            { category: "Impostor" },
          ),
        ],
        [
          textQ(
            76,
            "Champs, die beim Release dabei waren:\n      Ryze, Sion, Tristana, Lux, Kayle",
            "Lux",
            400,
            {
              category: "Impostor",
              info: "Release:19.10.2010",
            },
          ),
        ],
        [
          textQ(
            77,
            "Champs, die zu den ersten Star Guardians gehören:\n      Janna, Jinx, Lulu, Poppy, Soraka",
            "Soraka",
            600,
            { category: "Impostor" },
          ),
        ],
        [
          textQ(
            78,
            "Champs, die in Worlds 2016 mindestens 20 mal picked oder banned waren:\n      Cassiopeia, Braum, Sivir, Elise, Kennen",
            "Braum",
            800,
            {
              category: "Impostor",
              info: "Cassiopeia (22), Braum (16), Sivir (20), Elise (29), Kennen (22)",
            },
          ),
        ],
        [
          textQ(
            79,
            "Champs, die beim legendären Zed vs Zed Game gespielt wurden:\n      Fiddlesticks, Evelynn, Vi, Shen, Morgana",
            "Morgana",
            1000,
            {
              category: "Impostor",
              answertype: "IMAGE",
              alternateAnswer: "Morgana",
              answer: "FakerWhatWasThat.png",
            },
          ),
        ],
      ],
    },
  ],
};
