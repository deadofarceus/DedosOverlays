import { Board } from '../../../types/gameshows/Jepoardy';
import { imageQ, textQ, videoQ, audioQ } from './builders';

export const board1: Board = {
  id: 1,
  extra: "default",
  categories: [
    {
      name: "Finanzamt kommt",
      extra: "default",
      questions: [
        [imageQ(0, "1700_-200.png", "1700G", 200, { category: "Finanzamt kommt", info: "400 + (2*50) +  1200 = 1700" })],
        [imageQ(1, "4500_-_400.png", "4500G", 400, { category: "Finanzamt kommt", info: "450 + 3100 + 875 + 75 = 4500" })],
        [imageQ(2, "6850_-_600.png", "6850G", 600, { category: "Finanzamt kommt", info: "3000 + 1250 + 1200 + 1050 + 350 = 6850" })],
        [imageQ(3, "5030_-_800.png", "5030G", 800, { category: "Finanzamt kommt", info: "400 + 900 + 600 + 850 + 2200 + (2*40) = 5030" })],
        [imageQ(4, "2937_-1000.png", "2937G", 1000, { category: "Finanzamt kommt", info: "1337 + 1100 + 150 + 350 = 2937" })],
      ],
    },
    {
      name: "Community",
      extra: "default",
      questions: [
        [textQ(5, "Welchen Champ bannst du immer?", "Shaco, Mel, Zed", 600, { category: "Community", info: "Shaco: 26, Mel: 16, Zed: 13, Pyke: 12, Fizz: 12, Yasuo: 11, unklar/je nachdem: 10" })],
        [textQ(6, "Welchen Champ hast du am liebsten im eigenen Team?", "Ornn, Shen, Lulu", 600, { category: "Community", info: "Ornn: 30, Shen: 17, Lulu: 17, Nautilus: 15, Egal/Unklar: 15, Braum: 13, Thresh: 10, Malphite: 10" })],
        [textQ(7, "Spielst du mit Flash auf D oder Flash auf F?", "D", 600, { category: "Community", info: "Flash auf D: 151, Flash auf F: 141" })],
        [textQ(8, "Was ist das beste Emote in League?", "OK, Unklar/Keins, Daumen hoch", 600, { category: "Community", info: "OK/'Okay' (Rammus): 114, Unklar/Keins: 40, Daumen hoch/Thumbs Up ('Nice'): 35, Dabbing Pengu (D'Pengu): 21, Bee Happy: 20" })],
        [textQ(9, "Was ist dein Lieblingsitem? (was momentan im Shop zu finden ist)", "Heartsteel, Rabadons Deathcap, Infinity Edge", 600, { category: "Community", info: "Heartsteel: 26, Rabadons Deathcap: 26, Infinity Edge: 17, Blade of the Ruined King: 15, Shadowflame: 13, Unklar/Keins: 12" })],
      ],
    },
    {
      name: "Streamers Liebling",
      extra: "default",
      questions: [
        [videoQ(10, "BigSpin_Irelia.mp4", "Irelia", 200, { category: "Streamers Liebling" })],
        [videoQ(11, "Mango_Mordekaiser.mp4", "Mordekaiser", 400, { category: "Streamers Liebling" })],
        [videoQ(12, "Mango_Mordekaiser.mp4", "5", 600, { category: "Streamers Liebling" })],
        [videoQ(13, "Mango_Mordekaiser.mp4", "5", 800, { category: "Streamers Liebling" })],
        [videoQ(14, "Mango_Mordekaiser.mp4", "5", 1000, { category: "Streamers Liebling" })],
      ],
    },
    {
      name: "OddOneOut",
      extra: "default",
      questions: [
        [imageQ(15, "twitch_zaheen_w_auf_r.png", "Twitch mit Zaheen W auf R", 200, { category: "OddOneOut" })],
        [imageQ(19, "brand__leo_r.png", "Brand mit Leona R auf R", 400, { category: "OddOneOut" })],
        [imageQ(16, "rell__skarner_e.png", "Rell mit Skarner E auf E", 600, { category: "OddOneOut" })],
        [imageQ(17, "kassadin__malz_w.png", "Kassadin mit Malzahar E auf E", 800, { category: "OddOneOut" })],
        [imageQ(18, "yasuo__janna_p.png", "Yasuo mit Janna Passive auf Passive", 1000, { category: "OddOneOut" })],
      ],
    },
    {
      name: "Sound Themes",
      extra: "default",
      questions: [
        [audioQ(20, "Kaisa.mp3", "Kai'sa", 200, { category: "Sound Themes" })],
        [audioQ(21, "NunuWillump.mp3", "Nunu & Willump", 400, { category: "Sound Themes" })],
        [audioQ(22, "MorgKayle.mp3", "Morgana & Kayle", 600, { category: "Sound Themes" })],
        [audioQ(23, "XayahRakan.mp3", "Xayah & Rakan", 800, { category: "Sound Themes" })],
        [audioQ(24, "Skarner.mp3", "Skarner", 1000, { category: "Sound Themes" })],
      ],
    },
  ],
};
