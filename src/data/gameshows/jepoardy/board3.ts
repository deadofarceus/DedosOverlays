import { Board } from "../../../types/gameshows/Jepoardy";
import { imageQ, textQ } from "./builders";

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
      name: "Videos von Damals",
      extra: "default",
      questions: [
        [
          textQ(
            60,
            "Wer hat ein Video gepostet mit dem Titel 'Sleep is for the weak', indem dann 10 Minuten geschlafen wurde?",
            "Sola",
            200,
            {
              category: "Videos von Damals",
              answertype: "IMAGE",
              alternateAnswer: "Sola",
              answer: "SleepingSola.png",
            },
          ),
        ],
        [
          textQ(
            61,
            "In Broekis Video 'BRAUCHE EIN TASCHENRECHNER' hat er vor 6 Jahren welchen Champ gespielt?",
            "Vel'Koz",
            400,
            {
              category: "Videos von Damals",
              answertype: "IMAGE",
              alternateAnswer: "Vel'Koz",
              answer: "Taschenrechner.png",
            },
          ),
        ],
        [
          textQ(
            62,
            "Wer hat ein Video mit dem Titel 'Habe ich einen guten Farm? So findest du eine mögliche Antwort!' bereits vor 14 Jahren veröffentlicht?",
            "Maxim",
            600,
            {
              category: "Videos von Damals",
              answertype: "IMAGE",
              alternateAnswer: "Maxim",
              answer: "MaximFarm.png",
            },
          ),
        ],
        [
          textQ(
            64,
            "Welcher YouTuber hat als ältestes gelistetes Video 'Die Eloschule #1 - Riven Q' ?",
            "Vlesk",
            800,
            {
              category: "Videos von Damals",
              answertype: "IMAGE",
              alternateAnswer: "Vlesk",
              answer: "Vlesk_Schule.png",
            },
          ),
        ],
        [
          textQ(
            63,
            " Welcher YouTuber hat in seinem ältesten Video Lee Sin gespielt mit dem Namen 'Hodenkrebs587'?",
            "Autophil",
            1000,
            {
              category: "Videos von Damals",
              answertype: "IMAGE",
              alternateAnswer: "Autophil",
              answer: "PhilLeeSin.png",
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
          imageQ(
            66,
            "Rusty_Blitzcrank.jpg",
            "Sah dem Standart Skin zu ähnlich",
            400,
            {
              category: "Iconic Skins",
              answertype: "IMAGE",
              alternateAnswer: "Sah dem Standart Skin zu ähnlich",
              answer: "Rusty_Blitzcrank.jpg",
              extraQuestion: "Wieso wurde Rusty Blitzcrank removed?",
            },
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
          imageQ(68, "Singed_old.jpg", "Gamescom 2010", 800, {
            category: "Iconic Skins",
            answertype: "IMAGE",
            alternateAnswer: "Gamescom 2010",
            answer: "Singed_old.jpg",
            extraQuestion:
              "Wo konnte man den 'Riot Squad Singed' Skin erhalten?",
          }),
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
      name: "Hermits Gehilfe",
      extra: "default",
      questions: [
        [
          imageQ(70, "rabadons_frage.png", "Rabadon's Deathcap", 200, {
            category: "Hermits Gehilfe",
            extraQuestion:
              "Welches Item setzt sich aus den folgenden Items zusammen?",
            answertype: "IMAGE",
            answer: "rabaganz.png",
            alternateAnswer: "Rabadon's Deathcap",
          }),
        ],
        [
          imageQ(71, "innervating_locket.png", "Leben und Mana", 400, {
            category: "Hermits Gehilfe",
            extraQuestion: "Welche beiden Stats gibt Innervating Locket?",
            answertype: "IMAGE",
            answer: "locketganz.png",
            alternateAnswer: "Leben und Mana",
          }),
        ],
        [
          imageQ(72, "frozen_mallet_ohne_preis.png", "3300 Gold", 600, {
            category: "Hermits Gehilfe",
            answertype: "IMAGE",
            extraQuestion: "Wie viel kostet Frozen Mallet?",
            answer: "malletganz.png",
            alternateAnswer: "3300 Gold",
          }),
        ],
        [
          imageQ(73, "twin_shadows_frage.png", "Twin Shadows", 800, {
            category: "Hermits Gehilfe",
            answertype: "IMAGE",
            extraQuestion:
              "Welches Item setzt sich aus den folgenden Items zusammen?",
            alternateAnswer: "Twin Shadows",
            answer: "twinganz.png",
          }),
        ],
        [
          imageQ(74, "ga_frage.png", "Guardian Angel", 1000, {
            category: "Hermits Gehilfe",
            answertype: "IMAGE",
            extraQuestion:
              "Welches Item setzt sich aus den folgenden Items zusammen?",
            alternateAnswer: "Guardian Angel",
            answer: "gaganz.png",
          }),
        ],
      ],
    },
    {
      name: "Impostor",
      extra: "default",
      questions: [
        [
          imageQ(75, "Yunara Jhin Thresh Galio Urgot", "Yunara", 200, {
            category: "Impostor",
            answertype: "IMAGE",
            alternateAnswer: "Yunara",
            answer: "Yunara.png",
            extraQuestion: "Champs, die einen eigenen Login Screen hatten:",
          }),
        ],
        [
          imageQ(76, "Ryze Sion Tristana Lux Kayle", "Lux", 400, {
            category: "Impostor",
            info: "Release:19.10.2010",
            extraQuestion: "Champs, die beim Release dabei waren:",
            answertype: "IMAGE",
            answer: "LuxImp.png",
            alternateAnswer: "Lux",
          }),
        ],
        [
          imageQ(77, "Janna Jinx Lulu Poppy Soraka", "Soraka", 600, {
            category: "Impostor",
            info: "Release:20.12.2010",
            extraQuestion: "Champs, die zu den ersten Star Guardians gehören:",
            answertype: "IMAGE",
            answer: "SorakaImp.png",
            alternateAnswer: "Soraka",
          }),
        ],
        [
          imageQ(
            78,
            "Evelynn Mordekaiser Gangplank Skarner Ryze",
            "Gangplank",
            800,
            {
              category: "Impostor",
              info: "Evelynn (2), Mordekaiser (2), Gangplank (1), Skarner (3), Ryze (3)",
              answertype: "IMAGE",
              answer: "GangplankImp.png",
              extraQuestion: "Champs, die mindestens 2 Reworks hatten:",
              alternateAnswer: "Gangplank",
            },
          ),
        ],
        [
          imageQ(79, "Fiddlesticks Evelynn Vi Shen Morgana", "Morgana", 1000, {
            category: "Impostor",
            answertype: "IMAGE",
            alternateAnswer: "Morgana",
            answer: "MorganaImp.png",
            extraQuestion:
              "Champs, die beim legendären Zed vs Zed Game gespielt wurden:",
          }),
        ],
      ],
    },
  ],
};
