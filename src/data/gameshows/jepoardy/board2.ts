import { Board } from "../../../types/gameshows/Jepoardy";
import { imageQ, makeQuestion, textQ, videoQ } from "./builders";

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
          imageQ(
            30,
            "ZzRot_Portal.png",
            "Void Gate (120 Sek), aus dem Voidspawn kommt (alle 4 Sek)",
            100,
            {
              category: "Items",
              extraQuestion: "Was war der aktive Effekt des Zz'Rot Portals?",
              answertype: "IMAGE",
              alternateAnswer:
                "Void Gate (120 Sek), aus dem Voidspawn kommt (alle 4 Sek)",
              answer: "ZzRot_Portal.png",
            },
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
          imageQ(
            32,
            "Mana_Potion_item_old.jpg",
            "100 Mana (über 15 Sekunden)",
            300,
            {
              category: "Items",
              answertype: "IMAGE",
              answer: "Mana_Potion_item_old.jpg",
              alternateAnswer: "100 Mana (über 15 Sekunden)",
              extraQuestion:
                "Wie viel Mana hat man von der Mana Potion bekommen?",
            },
          ),
        ],
        [
          imageQ(
            33,
            "Sword_of_the_Occult_item.jpg",
            "20% Bonus Attack Speed",
            400,
            {
              category: "Items",
              joker: "Yoink",
              answertype: "IMAGE",
              answer: "Sword_of_the_Occult_item.jpg",
              alternateAnswer: "20% Bonus Attack Speed",
              extraQuestion:
                "Welchen Effekt hat 'Sword of the Occult' zusätzlich gegeben, wenn es voll gestacked war?",
            },
          ),
        ],
        [
          imageQ(34, "Ludens_Tempest_item.jpg", "Luden's Pulse", 500, {
            category: "Items",
            extraQuestion:
              "Wie hieß Luden's Echo, wenn es von Ornn geupgraded wurde?",
            answertype: "IMAGE",
            alternateAnswer: "Luden's Pulse",
            answer: "Ludens_Pulse.jpg",
          }),
        ],
      ],
    },
    {
      name: "Splash Art",
      extra: "default",
      questions: [
        [
          splashArtQ(35, 100, "Aatrox", "Augen", "Augen"),
          splashArtQ(35, 100, "Aatrox", "Brust", "Brust"),
          splashArtQ(35, 100, "Aatrox", "Hand", "Hand"),
          splashArtQ(35, 100, "Aatrox", "Hufte", "Hüften"),
          splashArtQ(35, 100, "Aatrox", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(36, 200, "Varus", "Augen", "Augen"),
          splashArtQ(36, 200, "Varus", "Brust", "Brust"),
          splashArtQ(36, 200, "Varus", "Hand", "Hand"),
          splashArtQ(36, 200, "Varus", "Hufte", "Hüften"),
          splashArtQ(36, 200, "Varus", "Lippen", "Lippen"),
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
          imageQ(40, "Swarm.jpg", "4", 100, {
            category: "Gamemode",
            answertype: "IMAGE",
            alternateAnswer: "4",
            answer: "Swarm.jpg",
            extraQuestion:
              "Wie viele Spieler konnten maximal gemeinsam den 'Swarm' Mode spielen?",
          }),
        ],
        [
          imageQ(41, "Ascension.jpg", "200", 200, {
            category: "Gamemode",
            answertype: "IMAGE",
            alternateAnswer: "200",
            answer: "Ascension.jpg",
            extraQuestion:
              "Wie viele Punkte brauchte man im Gamemode 'Ascension', um zu gewinnen?",
          }),
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
          imageQ(43, "StarGuardian.jpg", "Invasion", 400, {
            category: "Gamemode",
            answertype: "IMAGE",
            alternateAnswer: "Invasion",
            answer: "StarGuardian.jpg",
            extraQuestion:
              "Wie hieß der Gamemode, in dem man nur Star Guardians spielen konnte?",
          }),
        ],
        [
          imageQ(44, "Dominion.jpg", "4,5 Sekunden", 500, {
            category: "Gamemode",
            answertype: "IMAGE",
            extraQuestion: "Wie lange dauerte der Recall in Dominion?",
            alternateAnswer: "4,5 Sekunden",
            answer: "Dominion.jpg",
          }),
        ],
      ],
    },
    {
      name: "Pls nerf",
      extra: "default",
      questions: [
        [
          imageQ(
            45,
            "Soraka_E.jpg",
            "Bei Verbündeten Mana restoren, auf Gegnern Silence",
            100,
            {
              category: "Pls nerf",
              answertype: "IMAGE",
              alternateAnswer:
                "Bei Verbündeten Mana restoren, auf Gegnern Silence",
              answer: "Soraka_E.jpg",
              extraQuestion: "Nenne einen Effekt von Sorakas erster E.",
            },
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
          imageQ(47, "Kayle_Righteous_Fury_old.jpg", "10 Sekunden", 300, {
            category: "Pls nerf",
            answertype: "IMAGE",
            alternateAnswer: "10 Sekunden",
            answer: "Kayle_Righteous_Fury_old.jpg",
            extraQuestion:
              "Wie lang ging Kayles Aktive ihrer Ability 'Righteous Fury' (E) zu Release?",
          }),
        ],
        [
          imageQ(
            48,
            "Janna_Tailwind_old.jpg",
            "Alle Allies bekommen 3% Movement Speed solange Janna lebt",
            400,
            {
              category: "Pls nerf",
              answertype: "IMAGE",
              extraQuestion: "Was war Jannas erste Passive?",
              alternateAnswer:
                "Alle Allies bekommen 3% Movement Speed solange Janna lebt",
              answer: "Janna_Tailwind_old.jpg",
            },
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
          videoQ(
            51,
            "KeinWbisLevel4.mp4",
            "SIE SKILLT KEIN W BIS LEVEL 4! MAN!",
            200,
            {
              category: "Zitate",
              answertype: "VIDEO",
              answer: "KeinWbisLevel4Complete.mp4",
              alternateAnswer: "SIE SKILLT KEIN W BIS LEVEL 4! MAN!",
              info: "06.02.2018",
            },
          ),
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
          videoQ(54, "Mitfahrgelegenheit.mp4", "Kutcher.de", 400, {
            category: "Zitate",
            answertype: "VIDEO",
            answer: "MitfahrgelegenheitComplete.mp4",
            alternateAnswer:
              "'Kutcher.de' für schnelle Mitfahrgelegenheiten durch ganz Deutschland ",
            info: "02.04.2016",
          }),
        ],
        [
          videoQ(53, "Mori.mp4", "Spiele mit Noobs und Feedern", 500, {
            category: "Zitate",
            answertype: "VIDEO",
            answer: "MoriComplete.mp4",
            alternateAnswer: "Spiele mit Noobs und Feedern",
            info: "30.10.2016",
          }),
        ],
      ],
    },
  ],
};
