export class Account {
  summonerId: string;
  name: string;
  tagline: string;
  regionGroup: string;
  region: string;
  accountId: string | undefined;
  puuid: string;
  premium: boolean;
  queueTypes: number[];
  leagueEntrys: LeagueEntry[] = [];

  constructor(
    puuid: string,
    summonerId: string,
    name: string,
    tagline: string,
    premium: boolean,
    queueTypes: number[],
    regionGroup: string,
    region: string
  ) {
    this.puuid = puuid;
    this.summonerId = summonerId;
    this.name = name;
    this.tagline = tagline;
    this.premium = premium;
    this.queueTypes = queueTypes;
    this.regionGroup = regionGroup;
    this.region = region;
  }
}

export interface LeagueEntry {
  queueType: string;
  queueId: number;
  lastTimeUpdatedDay: number;
  tier: string;
  rank: string;
  leaguePoints: number;
  combinedLP: number;
  wins: number;
  loses: number;
  lastMatches: Match[];
  lpStart: number;
  gmBorder: number;
  challBorder: number;
}

export class Match {
  championName: string;
  championID: number;
  win: boolean;
  id: string;
  mvp: boolean;
  constructor(
    id: string,
    championName: string,
    championID: number,
    win: boolean,
    mvp: boolean
  ) {
    this.id = id;
    this.championName = championName;
    this.championID = championID;
    this.win = win;
    this.mvp = mvp;
  }
}

export interface ChampionMatchHistory {
  mvp: boolean;
  index: number;
  championName: string;
  win: boolean;
  length: number;
  isNew: boolean;
}

export interface MatchhistoryD {
  entry: LeagueEntry;
}

export interface AccountElo {
  eloLP: number;
  eloDivision: string;
  eloRank: string;
  lpDiff: number;
  gmBorder: number;
  challBorder: number;
}

export interface QueueType {
  queueId: number;
  map: string;
  description: string;
  notes: string | null;
}

export const QUEUETYPES: Map<string, QueueType> = new Map();

QUEUETYPES.set("flex", {
  queueId: 440,
  map: "Summoner's Rift",
  description: "5v5 Ranked Flex games",
  notes: null,
});

QUEUETYPES.set("soloduo", {
  queueId: 420,
  map: "Summoner's Rift",
  description: "5v5 Ranked Solo games",
  notes: null,
});

export class AbisZAccount {
  name: string;
  accountId: string;
  id!: string;
  puuid: string;
  lastMatch!: string;
  tier!: string;
  rank!: string;
  leaguePoints!: number;
  wins!: number;
  loses!: number;
  allGames!: number;
  championGroups: { letter: string; group: LetterGroup }[] = [];

  constructor(name: string, accountId: string, puuid: string) {
    this.name = name;
    this.accountId = accountId;
    this.puuid = puuid;
  }
}

export class LetterGroup {
  letter: string;
  champions: ChampionAbisZ[] = [];
  won: boolean = false;
  constructor(letter: string) {
    this.letter = letter;
  }
}

export class ChampionAbisZ {
  name: string;
  won: boolean = false;
  games: number = 0;
  constructor(name: string) {
    this.name = name;
  }
}

export const TESTABISZ: AbisZAccount = {
  name: "Broeki",
  accountId: "oUj4gYU5Uq_0xqYfXlS8YYA9TH2xAZ3bbuSFsWcHQ3ug7FU",
  id: "HK-WoPpnryGSFUs8Xu00gWX8Tjxhx6IobbwK_rgKlPjYB9M",
  puuid:
    "gZCeXcnhYZHdIAudO3ZThGiKjhMKBobSRrHRDBUGY7BTbnWYqt3xqP6buQNqmMRZMt-FPF0wqE_YdQ",
  championGroups: [
    {
      letter: "A",
      group: {
        letter: "A",
        champions: [
          { name: "Aatrox", won: false },
          { name: "Ahri", won: false },
          { name: "Akali", won: false },
          { name: "Akshan", won: false },
          { name: "Alistar", won: false },
          { name: "Amumu", won: false },
          { name: "Anivia", won: false },
          { name: "Annie", won: false },
          { name: "Aphelios", won: false },
          { name: "Ashe", won: false },
          { name: "AurelionSol", won: false },
          { name: "Azir", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "B",
      group: {
        letter: "B",
        champions: [
          { name: "Bard", won: false },
          { name: "Belveth", won: false },
          { name: "Blitzcrank", won: false },
          { name: "Brand", won: false },
          { name: "Braum", won: false },
          { name: "Briar", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "C",
      group: {
        letter: "C",
        champions: [
          { name: "Caitlyn", won: false },
          { name: "Camille", won: false },
          { name: "Cassiopeia", won: false },
          { name: "Chogath", won: false },
          { name: "Corki", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "D",
      group: {
        letter: "D",
        champions: [
          { name: "Darius", won: false },
          { name: "Diana", won: false },
          { name: "Draven", won: false },
          { name: "DrMundo", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "E",
      group: {
        letter: "E",
        champions: [
          { name: "Ekko", won: false },
          { name: "Elise", won: false },
          { name: "Evelynn", won: false },
          { name: "Ezreal", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "F",
      group: {
        letter: "F",
        champions: [
          { name: "Fiddlesticks", won: false },
          { name: "Fiora", won: false },
          { name: "Fizz", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "G",
      group: {
        letter: "G",
        champions: [
          { name: "Galio", won: false },
          { name: "Gangplank", won: false },
          { name: "Garen", won: false },
          { name: "Gnar", won: false },
          { name: "Gragas", won: false },
          { name: "Graves", won: false },
          { name: "Gwen", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "H",
      group: {
        letter: "H",
        champions: [
          { name: "Hecarim", won: false },
          { name: "Heimerdinger", won: false },
          { name: "Hwei", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "I",
      group: {
        letter: "I",
        champions: [
          { name: "Illaoi", won: false },
          { name: "Irelia", won: false },
          { name: "Ivern", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "J",
      group: {
        letter: "J",
        champions: [
          { name: "Janna", won: false },
          { name: "JarvanIV", won: false },
          { name: "Jax", won: false },
          { name: "Jayce", won: false },
          { name: "Jhin", won: false },
          { name: "Jinx", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "K",
      group: {
        letter: "K",
        champions: [
          { name: "Kaisa", won: false },
          { name: "Kalista", won: false },
          { name: "Karma", won: false },
          { name: "Karthus", won: false },
          { name: "Kassadin", won: false },
          { name: "Katarina", won: false },
          { name: "Kayle", won: false },
          { name: "Kayn", won: false },
          { name: "Kennen", won: false },
          { name: "Khazix", won: false },
          { name: "Kindred", won: false },
          { name: "Kled", won: false },
          { name: "KogMaw", won: false },
          { name: "KSante", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "L",
      group: {
        letter: "L",
        champions: [
          { name: "Leblanc", won: false },
          { name: "LeeSin", won: false },
          { name: "Leona", won: false },
          { name: "Lillia", won: false },
          { name: "Lissandra", won: false },
          { name: "Lucian", won: false },
          { name: "Lulu", won: false },
          { name: "Lux", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "M",
      group: {
        letter: "M",
        champions: [
          { name: "Malphite", won: false },
          { name: "Malzahar", won: false },
          { name: "Maokai", won: false },
          { name: "MasterYi", won: false },
          { name: "Milio", won: false },
          { name: "MissFortune", won: false },
          { name: "Mordekaiser", won: false },
          { name: "Morgana", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "N",
      group: {
        letter: "N",
        champions: [
          { name: "Naafiri", won: false },
          { name: "Nami", won: false },
          { name: "Nasus", won: false },
          { name: "Nautilus", won: false },
          { name: "Neeko", won: false },
          { name: "Nidalee", won: false },
          { name: "Nilah", won: false },
          { name: "Nocturne", won: false },
          { name: "Nunu", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "O",
      group: {
        letter: "O",
        champions: [
          { name: "Olaf", won: false },
          { name: "Orianna", won: false },
          { name: "Ornn", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "P",
      group: {
        letter: "P",
        champions: [
          { name: "Pantheon", won: false },
          { name: "Poppy", won: false },
          { name: "Pyke", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Q",
      group: {
        letter: "Q",
        champions: [
          { name: "Qiyana", won: false },
          { name: "Quinn", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "R",
      group: {
        letter: "R",
        champions: [
          { name: "Rakan", won: false },
          { name: "Rammus", won: false },
          { name: "RekSai", won: false },
          { name: "Rell", won: false },
          { name: "Renata", won: false },
          { name: "Renekton", won: false },
          { name: "Rengar", won: false },
          { name: "Riven", won: false },
          { name: "Rumble", won: false },
          { name: "Ryze", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "S",
      group: {
        letter: "S",
        champions: [
          { name: "Samira", won: false },
          { name: "Sejuani", won: false },
          { name: "Senna", won: false },
          { name: "Seraphine", won: false },
          { name: "Sett", won: false },
          { name: "Shaco", won: false },
          { name: "Shen", won: false },
          { name: "Shyvana", won: false },
          { name: "Singed", won: false },
          { name: "Sion", won: false },
          { name: "Sivir", won: false },
          { name: "Skarner", won: false },
          { name: "Smolder", won: false },
          { name: "Sona", won: false },
          { name: "Soraka", won: false },
          { name: "Swain", won: false },
          { name: "Sylas", won: false },
          { name: "Syndra", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "T",
      group: {
        letter: "T",
        champions: [
          { name: "TahmKench", won: false },
          { name: "Taliyah", won: false },
          { name: "Talon", won: false },
          { name: "Taric", won: false },
          { name: "Teemo", won: false },
          { name: "Thresh", won: true },
          { name: "Tristana", won: false },
          { name: "Trundle", won: false },
          { name: "Tryndamere", won: false },
          { name: "TwistedFate", won: false },
          { name: "Twitch", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "U",
      group: {
        letter: "U",
        champions: [
          { name: "Udyr", won: false },
          { name: "Urgot", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "V",
      group: {
        letter: "V",
        champions: [
          { name: "Varus", won: false },
          { name: "Vayne", won: false },
          { name: "Veigar", won: false },
          { name: "Velkoz", won: false },
          { name: "Vex", won: false },
          { name: "Vi", won: false },
          { name: "Viego", won: false },
          { name: "Viktor", won: false },
          { name: "Vladimir", won: false },
          { name: "Volibear", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "W",
      group: {
        letter: "W",
        champions: [
          { name: "Warwick", won: false },
          { name: "Wukong", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "X",
      group: {
        letter: "X",
        champions: [
          { name: "Xayah", won: false },
          { name: "Xerath", won: false },
          { name: "XinZhao", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Y",
      group: {
        letter: "Y",
        champions: [
          { name: "Yasuo", won: false },
          { name: "Yone", won: false },
          { name: "Yorick", won: false },
          { name: "Yuumi", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Z",
      group: {
        letter: "Z",
        champions: [
          { name: "Zac", won: false },
          { name: "Zed", won: false },
          { name: "Zeri", won: false },
          { name: "Ziggs", won: false },
          { name: "Zilean", won: false },
          { name: "Zoe", won: false },
          { name: "Zyra", won: false },
        ],
        won: false,
      },
    },
  ],
  // "rank": "IV",
  // "tier": "EMERALD",
  // "leaguePoints": 99,
  // "lastMatch": "EUW1_6846468909",
  // "wins": 100,
  // "loses": 100
} as AbisZAccount;

export const DEFAULTABISZ: AbisZAccount = {
  name: "Broeki",
  accountId: "oUj4gYU5Uq_0xqYfXlS8YYA9TH2xAZ3bbuSFsWcHQ3ug7FU",
  id: "HK-WoPpnryGSFUs8Xu00gWX8Tjxhx6IobbwK_rgKlPjYB9M",
  puuid:
    "gZCeXcnhYZHdIAudO3ZThGiKjhMKBobSRrHRDBUGY7BTbnWYqt3xqP6buQNqmMRZMt-FPF0wqE_YdQ",
  championGroups: [
    {
      letter: "A",
      group: {
        letter: "A",
        champions: [
          { name: "Aatrox", won: false },
          { name: "Ahri", won: false },
          { name: "Akali", won: false },
          { name: "Akshan", won: false },
          { name: "Alistar", won: false },
          { name: "Amumu", won: false },
          { name: "Anivia", won: false },
          { name: "Annie", won: false },
          { name: "Aphelios", won: false },
          { name: "Ashe", won: false },
          { name: "AurelionSol", won: false },
          { name: "Azir", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "B",
      group: {
        letter: "B",
        champions: [
          { name: "Bard", won: false },
          { name: "Belveth", won: false },
          { name: "Blitzcrank", won: false },
          { name: "Brand", won: false },
          { name: "Braum", won: false },
          { name: "Briar", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "C",
      group: {
        letter: "C",
        champions: [
          { name: "Caitlyn", won: false },
          { name: "Camille", won: false },
          { name: "Cassiopeia", won: false },
          { name: "Chogath", won: false },
          { name: "Corki", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "D",
      group: {
        letter: "D",
        champions: [
          { name: "Darius", won: false },
          { name: "Diana", won: false },
          { name: "Draven", won: false },
          { name: "DrMundo", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "E",
      group: {
        letter: "E",
        champions: [
          { name: "Ekko", won: false },
          { name: "Elise", won: false },
          { name: "Evelynn", won: false },
          { name: "Ezreal", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "F",
      group: {
        letter: "F",
        champions: [
          { name: "Fiddlesticks", won: false },
          { name: "Fiora", won: false },
          { name: "Fizz", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "G",
      group: {
        letter: "G",
        champions: [
          { name: "Galio", won: false },
          { name: "Gangplank", won: false },
          { name: "Garen", won: false },
          { name: "Gnar", won: false },
          { name: "Gragas", won: false },
          { name: "Graves", won: false },
          { name: "Gwen", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "H",
      group: {
        letter: "H",
        champions: [
          { name: "Hecarim", won: false },
          { name: "Heimerdinger", won: false },
          { name: "Hwei", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "I",
      group: {
        letter: "I",
        champions: [
          { name: "Illaoi", won: false },
          { name: "Irelia", won: false },
          { name: "Ivern", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "J",
      group: {
        letter: "J",
        champions: [
          { name: "Janna", won: false },
          { name: "JarvanIV", won: false },
          { name: "Jax", won: false },
          { name: "Jayce", won: false },
          { name: "Jhin", won: false },
          { name: "Jinx", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "K",
      group: {
        letter: "K",
        champions: [
          { name: "Kaisa", won: false },
          { name: "Kalista", won: false },
          { name: "Karma", won: false },
          { name: "Karthus", won: false },
          { name: "Kassadin", won: false },
          { name: "Katarina", won: false },
          { name: "Kayle", won: false },
          { name: "Kayn", won: false },
          { name: "Kennen", won: false },
          { name: "Khazix", won: false },
          { name: "Kindred", won: false },
          { name: "Kled", won: false },
          { name: "KogMaw", won: false },
          { name: "KSante", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "L",
      group: {
        letter: "L",
        champions: [
          { name: "Leblanc", won: false },
          { name: "LeeSin", won: false },
          { name: "Leona", won: false },
          { name: "Lillia", won: false },
          { name: "Lissandra", won: false },
          { name: "Lucian", won: false },
          { name: "Lulu", won: false },
          { name: "Lux", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "M",
      group: {
        letter: "M",
        champions: [
          { name: "Malphite", won: false },
          { name: "Malzahar", won: false },
          { name: "Maokai", won: false },
          { name: "MasterYi", won: false },
          { name: "Milio", won: false },
          { name: "MissFortune", won: false },
          { name: "Mordekaiser", won: false },
          { name: "Morgana", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "N",
      group: {
        letter: "N",
        champions: [
          { name: "Naafiri", won: false },
          { name: "Nami", won: false },
          { name: "Nasus", won: false },
          { name: "Nautilus", won: false },
          { name: "Neeko", won: false },
          { name: "Nidalee", won: false },
          { name: "Nilah", won: false },
          { name: "Nocturne", won: false },
          { name: "Nunu", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "O",
      group: {
        letter: "O",
        champions: [
          { name: "Olaf", won: false },
          { name: "Orianna", won: false },
          { name: "Ornn", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "P",
      group: {
        letter: "P",
        champions: [
          { name: "Pantheon", won: false },
          { name: "Poppy", won: false },
          { name: "Pyke", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Q",
      group: {
        letter: "Q",
        champions: [
          { name: "Qiyana", won: false },
          { name: "Quinn", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "R",
      group: {
        letter: "R",
        champions: [
          { name: "Rakan", won: false },
          { name: "Rammus", won: false },
          { name: "RekSai", won: false },
          { name: "Rell", won: false },
          { name: "Renata", won: false },
          { name: "Renekton", won: false },
          { name: "Rengar", won: false },
          { name: "Riven", won: false },
          { name: "Rumble", won: false },
          { name: "Ryze", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "S",
      group: {
        letter: "S",
        champions: [
          { name: "Samira", won: false },
          { name: "Sejuani", won: false },
          { name: "Senna", won: false },
          { name: "Seraphine", won: false },
          { name: "Sett", won: false },
          { name: "Shaco", won: false },
          { name: "Shen", won: false },
          { name: "Shyvana", won: false },
          { name: "Singed", won: false },
          { name: "Sion", won: false },
          { name: "Sivir", won: false },
          { name: "Skarner", won: false },
          { name: "Smolder", won: false },
          { name: "Sona", won: false },
          { name: "Soraka", won: false },
          { name: "Swain", won: false },
          { name: "Sylas", won: false },
          { name: "Syndra", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "T",
      group: {
        letter: "T",
        champions: [
          { name: "TahmKench", won: false },
          { name: "Taliyah", won: false },
          { name: "Talon", won: false },
          { name: "Taric", won: false },
          { name: "Teemo", won: false },
          { name: "Thresh", won: true },
          { name: "Tristana", won: false },
          { name: "Trundle", won: false },
          { name: "Tryndamere", won: false },
          { name: "TwistedFate", won: false },
          { name: "Twitch", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "U",
      group: {
        letter: "U",
        champions: [
          { name: "Udyr", won: false },
          { name: "Urgot", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "V",
      group: {
        letter: "V",
        champions: [
          { name: "Varus", won: false },
          { name: "Vayne", won: false },
          { name: "Veigar", won: false },
          { name: "Velkoz", won: false },
          { name: "Vex", won: false },
          { name: "Vi", won: false },
          { name: "Viego", won: false },
          { name: "Viktor", won: false },
          { name: "Vladimir", won: false },
          { name: "Volibear", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "W",
      group: {
        letter: "W",
        champions: [
          { name: "Warwick", won: false },
          { name: "Wukong", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "X",
      group: {
        letter: "X",
        champions: [
          { name: "Xayah", won: false },
          { name: "Xerath", won: false },
          { name: "XinZhao", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Y",
      group: {
        letter: "Y",
        champions: [
          { name: "Yasuo", won: false },
          { name: "Yone", won: false },
          { name: "Yorick", won: false },
          { name: "Yuumi", won: false },
        ],
        won: false,
      },
    },
    {
      letter: "Z",
      group: {
        letter: "Z",
        champions: [
          { name: "Zac", won: false },
          { name: "Zed", won: false },
          { name: "Zeri", won: false },
          { name: "Ziggs", won: false },
          { name: "Zilean", won: false },
          { name: "Zoe", won: false },
          { name: "Zyra", won: false },
        ],
        won: false,
      },
    },
  ],
  // "rank": "IV",
  // "tier": "EMERALD",
  // "leaguePoints": 99,
  // "lastMatch": "EUW1_6846468909",
  // "wins": 100,
  // "loses": 100
} as AbisZAccount;

export const DEFAULTELOOVERLAY: Account = {
  summonerId: "",
  name: "",
  tagline: "",
  puuid: "",
  region: "EUW1",
  accountId: "",
  regionGroup: "euw",
  premium: true,
  queueTypes: [420],
  leagueEntrys: [
    {
      tier: "UNRANKED",
      rank: "IV",
      leaguePoints: 0,
      combinedLP: 0,
      wins: 205,
      loses: 173,
      lastMatches: [
        {
          championName: "null",
          championID: 497,
          win: true,
          id: "EUW1_6792213944",
          mvp: false,
        },
        {
          championName: "null",
          championID: 432,
          win: true,
          mvp: false,
          id: "EUW1_6792270986",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792346795",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792427799",
        },
        {
          championName: "null",
          championID: 432,
          mvp: false,
          win: true,
          id: "EUW1_6792492999",
        },
      ],
      lpStart: 0,
      gmBorder: 200,
      challBorder: 700,
      queueId: 420,
      queueType: "RANKED_SOlO_5x5",
      lastTimeUpdatedDay: 0,
    },
    {
      tier: "UNRANKED",
      rank: "IV",
      leaguePoints: 0,
      combinedLP: 0,
      wins: 205,
      loses: 173,
      lastMatches: [
        {
          championName: "null",
          championID: 497,
          win: true,
          id: "EUW1_6792213944",
          mvp: false,
        },
        {
          championName: "null",
          championID: 432,
          win: true,
          mvp: false,
          id: "EUW1_6792270986",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792346795",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792427799",
        },
        {
          championName: "null",
          championID: 432,
          mvp: false,
          win: true,
          id: "EUW1_6792492999",
        },
      ],
      lpStart: 0,
      gmBorder: 200,
      challBorder: 700,
      queueId: 440,
      queueType: "RANKED_SOlO_5x5",
      lastTimeUpdatedDay: 0,
    },
  ],
};

export const EXAMPLEELOOVERLAY: Account = {
  summonerId: "",
  name: "",
  tagline: "",
  puuid: "",
  region: "EUW1",
  accountId: "",
  regionGroup: "euw",
  premium: true,
  queueTypes: [420],
  leagueEntrys: [
    {
      tier: "MASTER",
      rank: "IV",
      leaguePoints: 142,
      combinedLP: 196,
      wins: 205,
      loses: 173,
      lastMatches: [
        {
          championName: "Jhin",
          championID: 497,
          win: false,
          id: "EUW1_6792213944",
          mvp: false,
        },
        {
          championName: "Veigar",
          championID: 432,
          win: true,
          mvp: false,
          id: "EUW1_6792270986",
        },
        {
          championName: "Gragas",
          championID: 497,
          mvp: false,
          win: false,
          id: "EUW1_6792346795",
        },
        {
          championName: "Ahri",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792427799",
        },
        {
          championName: "Irelia",
          championID: 432,
          mvp: true,
          win: true,
          id: "EUW1_6792492999",
        },
      ],
      lpStart: 100,
      gmBorder: 244,
      challBorder: 700,
      queueId: 420,
      queueType: "RANKED_SOlO_5x5",
      lastTimeUpdatedDay: 0,
    },
    {
      tier: "UNRANKED",
      rank: "IV",
      leaguePoints: 0,
      combinedLP: 0,
      wins: 205,
      loses: 173,
      lastMatches: [
        {
          championName: "null",
          championID: 497,
          win: true,
          id: "EUW1_6792213944",
          mvp: false,
        },
        {
          championName: "null",
          championID: 432,
          win: true,
          mvp: false,
          id: "EUW1_6792270986",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792346795",
        },
        {
          championName: "null",
          championID: 497,
          mvp: false,
          win: true,
          id: "EUW1_6792427799",
        },
        {
          championName: "null",
          championID: 432,
          mvp: false,
          win: true,
          id: "EUW1_6792492999",
        },
      ],
      lpStart: 0,
      gmBorder: 200,
      challBorder: 700,
      queueId: 440,
      queueType: "RANKED_SOlO_5x5",
      lastTimeUpdatedDay: 0,
    },
  ],
};
