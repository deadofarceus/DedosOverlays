import { Board } from "../../../types/gameshows/Jepoardy";
import { makeQuestion, textQ, videoQ } from "./builders";

// Helper for "Splash Art" subquestions (old splash arts guessed by body part)
const splashArtQ = (
  id: number,
  points: number,
  name: string,
  part: string,
  info: string,
) =>
  makeQuestion({
    id,
    category: "Splash Art",
    points,
    type: "IMAGE",
    question: `${name}${part.toLowerCase()}.jpg`,
    answertype: "IMAGE",
    answer: `${name}.jpg`,
    alternateAnswer: name,
    info,
  });

export const classic0: Board = {
  id: 0,
  extra: "default",
  categories: [
    {
      name: "Items",
      extra: "default",
      questions: [
        [
          textQ(
            30,
            "Was war der aktive Effekt des Zz'Rot Portals?",
            "Void Gate (120 Sek), aus dem Voidspawn kommt (alle 4 Sek)",
            100,
            { category: "Items" },
          ),
        ],
        [
          textQ(
            31,
            "Welches Support Item kostete 800G und konnte für den doppelten Preis zu einer Rubin Variante geupgraded werden?",
            "Sightstone",
            200,
            {
              category: "Items",
              answertype: "IMAGE",
              alternateAnswer: "Sightstone",
              answer: "Sightstone.jpg",
            },
          ),
        ],
        [
          textQ(
            32,
            "Wie viel Mana hat man von der Mana Potion bekommen?",
            "100 Mana (über 15 Sekunden)",
            300,
            { category: "Items" },
          ),
        ],
        [
          textQ(
            33,
            "Welchen Effekt hat 'Sword of the Occult' zusätzlich gegeben, wenn es voll gestacked war?",
            "20% Bonus Attack Speed",
            400,
            { category: "Items", joker: "Yoink" },
          ),
        ],
        [
          textQ(
            34,
            "Wie hieß Luden's Echo, wenn es von Ornn geupgraded wurde?",
            "Luden's Pulse",
            500,
            {
              category: "Items",
              answertype: "IMAGE",
              alternateAnswer: "Luden's Pulse",
              answer: "Ludens_Pulse.jpg",
            },
          ),
        ],
      ],
    },
    {
      name: "Splash Art",
      extra: "default",
      questions: [
        [
          splashArtQ(35, 100, "Morgana", "Augen", "Augen"),
          splashArtQ(35, 100, "Morgana", "Brust", "Brust"),
          splashArtQ(35, 100, "Morgana", "Hand", "Hand"),
          splashArtQ(35, 100, "Morgana", "Hufte", "Hüften"),
          splashArtQ(35, 100, "Morgana", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(36, 200, "Lux", "Augen", "Augen"),
          splashArtQ(36, 200, "Lux", "Brust", "Brust"),
          splashArtQ(36, 200, "Lux", "Hand", "Hand"),
          splashArtQ(36, 200, "Lux", "Hufte", "Hüften"),
          splashArtQ(36, 200, "Lux", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(37, 300, "Ryze", "Augen", "Augen"),
          splashArtQ(37, 300, "Ryze", "Brust", "Brust"),
          splashArtQ(37, 300, "Ryze", "Hand", "Hand"),
          splashArtQ(37, 300, "Ryze", "Hufte", "Hüften"),
          splashArtQ(37, 300, "Ryze", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(38, 400, "Poppy", "Augen", "Augen"),
          splashArtQ(38, 400, "Poppy", "Brust", "Brust"),
          splashArtQ(38, 400, "Poppy", "Hand", "Hand"),
          splashArtQ(38, 400, "Poppy", "Hufte", "Hüften"),
          splashArtQ(38, 400, "Poppy", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(39, 500, "TwistedFate", "Augen", "Augen"),
          splashArtQ(39, 500, "TwistedFate", "Brust", "Brust"),
          splashArtQ(39, 500, "TwistedFate", "Hand", "Hand"),
          splashArtQ(39, 500, "TwistedFate", "Hufte", "Hüften"),
          splashArtQ(39, 500, "TwistedFate", "Lippen", "Lippen"),
        ],
      ],
    },
    {
      name: "Gamemode",
      extra: "default",
      questions: [
        [
          textQ(
            40,
            "Wie viele Spieler konnten maximal gemeinsam den 'Swarm' Mode spielen?",
            "4",
            100,
            { category: "Gamemode" },
          ),
        ],
        [
          textQ(
            41,
            "Wie viele Punkte brauchte man im Gamemode 'Ascension', um zu gewinnen?",
            "200",
            200,
            { category: "Gamemode" },
          ),
        ],
        [
          textQ(
            42,
            "Wer war der Boss im Gamemode 'Odyssey: Extraction'?",
            "Kayn",
            300,
            {
              category: "Gamemode",
              answertype: "IMAGE",
              alternateAnswer: "Kayn",
              answer: "BossKayn.jpg",
              joker: "NoYou",
            },
          ),
        ],
        [
          textQ(
            43,
            "Wie hieß der Gamemode, in dem man nur Star Guardians spielen konnte?",
            "Invasion",
            400,
            { category: "Gamemode" },
          ),
        ],
        [
          textQ(
            44,
            "Wie lange dauerte der Recall in Dominion?",
            "4,5 Sekunden",
            500,
            { category: "Gamemode" },
          ),
        ],
      ],
    },
    {
      name: "Pls nerf",
      extra: "default",
      questions: [
        [
          textQ(
            45,
            "Nenne einen effekt sorakas erster E",
            "Auf Verbündete Mana restoren, auf Gegnern Silence",
            100,
            { category: "Pls nerf" },
          ),
        ],
        [
          textQ(
            46,
            "Welcher Champion war mal untargetable in der Ult, während dieser 5 mal Damage an Champions gemacht hat?",
            "Fiora",
            200,
            {
              category: "Pls nerf",
              answertype: "IMAGE",
              alternateAnswer: "Fiora",
              answer: "FioraClassic.jpg",
            },
          ),
        ],
        [
          textQ(
            47,
            "Wie lang ging Kayles Aktive ihrer Ability 'Righteous Fury' (E) zu Release?",
            "10 Sekunden",
            300,
            { category: "Pls nerf" },
          ),
        ],
        [
          textQ(
            48,
            "Was war Jannas erste Passive?",
            "Alle Allies bekommen 3% Movement Speed solange Janna lebt",
            400,
            { category: "Pls nerf" },
          ),
        ],
        [
          textQ(
            49,
            "Wessen Ult war das zu Release? Passiv: permanente CDR, Aktiv: 6 Sek. lang Bonus Spell Vamp, 80 Bonus MS, Basic Abilities machen ihren 50% Schaden an umliegenden Gegnern des Ziels",
            "Ryze",
            500,
            {
              category: "Pls nerf",
              answertype: "IMAGE",
              answer: "Ryze.jpg",
              alternateAnswer: "Ryze",
              joker: "Gamemaster",
            },
          ),
        ],
      ],
    },
    {
      name: "Zitate",
      extra: "default",
      questions: [
        [
          videoQ(
            50,
            "StillTheMain.mp4",
            "STILL THE MAAAAAAAAAAAAIIIIINNNNN",
            100,
            {
              category: "Zitate",
              answertype: "VIDEO",
              answer: "StillTheMainComplete.mp4",
              alternateAnswer: "STILL THE MAAAAAAAAAAAAIIIIINNNNN",
              info: "28.05.2015",
            },
          ),
        ],
        [
          videoQ(51, "KeinWbisLevel4.mp4", "KEIN W BIS LEVEL 4!", 200, {
            category: "Zitate",
            answertype: "VIDEO",
            answer: "KeinWbisLevel4Complete.mp4",
            alternateAnswer: "KEIN W BIS LEVEL 4! MAN!",
            info: "06.02.2018",
          }),
        ],
        [
          videoQ(
            52,
            "Darius.mp4",
            "Damage ist auf jeden fall besser als Schaden auf Darius!",
            300,
            {
              category: "Zitate",
              answertype: "VIDEO",
              answer: "DariusComplete.mp4",
              alternateAnswer:
                "Damage ist auf jeden fall besser als Schaden auf Darius!",
              info: "09.07.2014",
            },
          ),
        ],
        [
          videoQ(53, "Uli.mp4", "Uli was ist denn da los", 400, {
            category: "Zitate",
            answertype: "VIDEO",
            answer: "UliComplete.mp4",
            alternateAnswer: "ULI, was ist denn da los?",
            info: "23.01.2018",
          }),
        ],
        [
          videoQ(54, "Mitfahrgelegenheit.mp4", "Kutcher.de", 500, {
            category: "Zitate",
            answertype: "VIDEO",
            answer: "MitfahrgelegenheitComplete.mp4",
            alternateAnswer:
              "'Kutcher.de' für schnelle Mitfahrgelegenheiten durch ganz Deutschland ",
            info: "02.04.2016",
          }),
        ],
      ],
    },
  ],
};
