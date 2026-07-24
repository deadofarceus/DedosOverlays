import { Board } from "../../../types/gameshows/Jepoardy";
import { makeQuestion, textQ } from "./builders";

// Helper for "Splash Art" subquestions (old splash arts guessed by body part)
const splashArtQ = (id: number, name: string, part: string, info: string) =>
  makeQuestion({
    id,
    category: "Splash Art",
    points: 300,
    type: "IMAGE",
    question: `${name}${part.toLowerCase()}.jpg`,
    answertype: "IMAGE",
    answer: `${name}.jpg`,
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
            { category: "Items" },
          ),
        ],
        [
          textQ(
            34,
            "Wie hieß Luden's Echo, wenn es von Ornn geupgraded wurde?",
            "Luden's Pulse",
            500,
            { category: "Items" },
          ),
        ],
      ],
    },
    {
      name: "Splash Art",
      extra: "default",
      questions: [
        [
          splashArtQ(35, "Morgana", "Augen", "Augen"),
          splashArtQ(35, "Morgana", "Brust", "Brust"),
          splashArtQ(35, "Morgana", "Hand", "Hand"),
          splashArtQ(35, "Morgana", "Hufte", "Hüften"),
          splashArtQ(35, "Morgana", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(36, "Lux", "Augen", "Augen"),
          splashArtQ(36, "Lux", "Brust", "Brust"),
          splashArtQ(36, "Lux", "Hand", "Hand"),
          splashArtQ(36, "Lux", "Hufte", "Hüften"),
          splashArtQ(36, "Lux", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(37, "Ryze", "Augen", "Augen"),
          splashArtQ(37, "Ryze", "Brust", "Brust"),
          splashArtQ(37, "Ryze", "Hand", "Hand"),
          splashArtQ(37, "Ryze", "Hufte", "Hüften"),
          splashArtQ(37, "Ryze", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(38, "Poppy", "Augen", "Augen"),
          splashArtQ(38, "Poppy", "Brust", "Brust"),
          splashArtQ(38, "Poppy", "Hand", "Hand"),
          splashArtQ(38, "Poppy", "Hufte", "Hüften"),
          splashArtQ(38, "Poppy", "Lippen", "Lippen"),
        ],
        [
          splashArtQ(39, "TwistedFate", "Augen", "Augen"),
          splashArtQ(39, "TwistedFate", "Brust", "Brust"),
          splashArtQ(39, "TwistedFate", "Hand", "Hand"),
          splashArtQ(39, "TwistedFate", "Hufte", "Hüften"),
          splashArtQ(39, "TwistedFate", "Lippen", "Lippen"),
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
              answer: "Kayn.png",
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
            "Was konnte Sorakas W zu ihrem Release machen?",
            "Mana restoren",
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
              answer: "Fiora.png",
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
            },
          ),
        ],
      ],
    },
    {
      name: "Quotes",
      extra: "default",
      questions: [
        [
          textQ(
            50,
            "Look at the Cleanse, Look at the Moves! …",
            "FAKER! What was that!?",
            100,
            { category: "Quotes" },
          ),
        ],
        [
          textQ(
            51,
            "He's still alive, he's still surviving …",
            "He stays alive!",
            200,
            {
              category: "Quotes",
              info: "OMG vs RYL World Championship Quarterfinals",
            },
          ),
        ],
        [
          textQ(52, "GUMA! Can he steal it? No way! …", "WTF!", 300, {
            category: "Quotes",
            info: "Gumas Baronsteal",
          }),
        ],
        [
          textQ(
            53,
            "CLG take the Inhibitor, they are gonna take the Nexus, and …",
            "they are gonna take a trip to Worlds!",
            400,
            {
              category: "Quotes",
              info: "CLG vs TSM 2015 LCS Summer Finals",
            },
          ),
        ],
        [
          textQ(
            54,
            "2v5 is possible, I mean you're not gonna stop the baron, might get a teamfight, he's gonna shoot …",
            "You're kidding me!",
            500,
            {
              category: "Quotes",
              info: "EG vs TL Baronsteal mit Jinx in Spring Finals",
            },
          ),
        ],
      ],
    },
  ],
};
