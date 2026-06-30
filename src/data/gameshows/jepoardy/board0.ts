import { Board } from "../../../types/gameshows/Jepoardy";
import { makeQuestion, audioQ, textQ } from "./builders";

// Helper for "Guess the Champ" subquestions
const guessChampQ = (id: number, name: string, part: string, info: string) =>
  makeQuestion({
    id,
    category: "Guess the Champ",
    points: 300,
    type: "IMAGE",
    question: `${name}${part}.png`,
    answertype: "IMAGE",
    answer: `${name}_0.jpg`,
    info,
  });

export const board0: Board = {
  id: 0,
  extra: "default",
  categories: [
    {
      name: "Guess the Champ",
      extra: "default",
      questions: [
        [
          guessChampQ(10, "Leona", "Augen", "Augen"),
          guessChampQ(10, "Leona", "Brust", "Brust"),
          guessChampQ(10, "Leona", "Hand", "Hand"),
          guessChampQ(10, "Leona", "Hufte", "Hüfte"),
          guessChampQ(10, "Leona", "Lippen", "Lippen"),
        ],
        [
          guessChampQ(11, "Nasus", "Augen", "Augen"),
          guessChampQ(11, "Nasus", "Brust", "Brust"),
          guessChampQ(11, "Nasus", "Hand", "Hand"),
          guessChampQ(11, "Nasus", "Hufte", "Hüfte"),
          guessChampQ(11, "Nasus", "Lippen", "Lippen"),
        ],
        [
          guessChampQ(12, "Shyvana", "Augen", "Augen"),
          guessChampQ(12, "Shyvana", "Brust", "Brust"),
          guessChampQ(12, "Shyvana", "Hand", "Hand"),
          guessChampQ(12, "Shyvana", "Hufte", "Hüfte"),
          guessChampQ(12, "Shyvana", "Lippen", "Lippen"),
        ],
        [
          guessChampQ(13, "Viego", "Augen", "Augen"),
          guessChampQ(13, "Viego", "Brust", "Brust"),
          guessChampQ(13, "Viego", "Hand", "Hand"),
          guessChampQ(13, "Viego", "Hufte", "Hüfte"),
          guessChampQ(13, "Viego", "Lippen", "Lippen"),
        ],
        [
          guessChampQ(14, "Zilean", "Augen", "Augen"),
          guessChampQ(14, "Zilean", "Brust", "Brust"),
          guessChampQ(14, "Zilean", "Hand", "Hand"),
          guessChampQ(14, "Zilean", "Hufte", "Hüfte"),
          guessChampQ(14, "Zilean", "Lippen", "Lippen"),
        ],
      ],
    },
    {
      name: "LOL",
      extra: "default",
      questions: [
        [
          audioQ(5, "Sona_Original_Laugh_0.ogg", "Sona", 100, {
            category: "LOL",
          }),
        ],
        [
          audioQ(6, "Pyke_Original_Laugh_0.ogg", "Pyke", 200, {
            category: "LOL",
          }),
        ],
        [
          audioQ(7, "Taliyah_Original_Laugh_0.ogg", "Taliyah", 300, {
            category: "LOL",
          }),
        ],
        [
          audioQ(8, "Quinn_Original_Laugh_0.ogg", "Quinn", 400, {
            category: "LOL",
            joker: "Gamemaster",
          }),
        ],
        [
          audioQ(9, "Alistar_Original_Laugh_1.ogg", "Alistar", 500, {
            category: "LOL",
          }),
        ],
      ],
    },
    {
      name: "One Sentence Lore",
      extra: "default",
      questions: [
        [
          textQ(
            15,
            "Dieser Champ durchquert die Welt, weil er einen Freund finden will, aber ein Fluch macht es ihm unmöglich",
            "Amumu",
            100,
            { category: "One Sentence Lore" },
          ),
        ],
        [
          textQ(
            16,
            "Dieser Champ war eigentlich nur ein Fabelwesen, das Kindern Angst machen sollte, doch wurde real",
            "Fiddlesticks",
            200,
            { category: "One Sentence Lore" },
          ),
        ],
        [
          textQ(
            17,
            "Der gesuchte Champ ist laut Lore mit folgenden Champs verknüpft: Ornn, Udyr, Anivia, Volibear",
            "Aurora",
            300,
            { category: "One Sentence Lore" },
          ),
        ],
        [
          textQ(
            18,
            "Dieser Champ sollte eine politische Ehe eingehen, weigerte sich und brachte anschließend den eigenen Vater um",
            "Fiora",
            400,
            { category: "One Sentence Lore" },
          ),
        ],
        [
          textQ(
            19,
            "Dieser Champ entdeckte die eigenen Fähigkeiten durch Wut und aus dem Wunsch heraus nie wieder kontrolliert zu werden",
            "Syndra",
            500,
            { category: "One Sentence Lore", joker: "NoYou" },
          ),
        ],
      ],
    },
    {
      name: "Jhin",
      extra: "default",
      questions: [
        [
          textQ(
            20,
            "Nenne 4 Champs, die von den Shadow Isles kommen",
            "Elise, Gwen, Hecarim, Kalista, Karthus, Maokai, Thresh, Vex, Viego, Yorick",
            444,
            { category: "Jhin" },
          ),
        ],
        [
          textQ(
            21,
            "Nenne 4 Champs mit einer Revive Mechanic",
            "Akshan, Zilean, Renata, Zaahen, Zac, Anivia",
            444,
            { category: "Jhin", joker: "Yoink" },
          ),
        ],
        [
          textQ(
            22,
            "Nenne 4 Yordle Champs",
            "Corki, Fizz, Gnar, Heimerdinger, Kennen, Kled, Lulu, Poppy, Rumble, Teemo, Tristana, Veigar, Ziggs",
            444,
            { category: "Jhin" },
          ),
        ],
        [
          textQ(
            23,
            "Nenne die 4 neusten Champs",
            "Zaahen, Yunara, Locke, Ambessa",
            444,
            { category: "Jhin" },
          ),
        ],
        [
          textQ(
            24,
            "Nenne 4 Champs, die im 'Still here' Musikvideo auftreten",
            "Tryndamere, Kindred, Yasuo, Morgana, Kayle, Aatrox, Ashe",
            444,
            { category: "Jhin" },
          ),
        ],
      ],
    },
    {
      name: "Imposter",
      extra: "default",
      questions: [
        [
          textQ(
            25,
            "Diese Champs nutzen Mana als Ressource: \n                  Aatrox, Ahri, Alistar, Amumu, Anivia",
            "Aatrox (Manaless)",
            100,
            { category: "Imposter" },
          ),
        ],
        [
          textQ(
            26,
            "Diese Champs haben in Arcane mitgespielt:\n                  Vi, Ambessa, Ekko, Renata, Heimerdinger",
            "Renata",
            200,
            { category: "Imposter" },
          ),
        ],
        [
          textQ(
            27,
            "Diese Champs haben 10 Skins oder mehr (Default nicht mitgezählt) (Stand:19.04.26): \n                  Malzahar, Nasus, Nidalee, Pyke, Lissandra",
            "Lissandra (9)",
            300,
            {
              category: "Imposter",
              info: "Malzahar (13), Nasus (13), Nidalee (16), Pyke (12), Lissandra (9)",
            },
          ),
        ],
        [
          textQ(
            28,
            "Diese Champs haben einen Legacy Valentinstag Skin:\n                  Rakan, Yuumi, Nami, Annie, Sona",
            "Nami",
            400,
            {
              category: "Imposter",
              info: "Rakan (Sweetheart), Yuumi (Heartseeker), Nami (keinen), Annie (Sweetheart), Sona (Sweetheart)",
            },
          ),
        ],
        [
          textQ(
            29,
            "Diese Champs haben einen Attackspeed von mindestens 0,65 (Patch 26.01): \n                  Katarina, Maokai, Sejuani, Xerath, Lucian",
            "Lucian (0,638)",
            500,
            {
              category: "Imposter",
              info: "Katarina (0,658), Maokai (0,8), Sejuani (0,688), Xerath (0,658), Lucian (0,638)",
            },
          ),
        ],
      ],
    },
  ],
};
