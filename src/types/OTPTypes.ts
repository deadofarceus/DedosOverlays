export class OTPPlayerProps {
  index: number;
  lp: number;
  tier: string;
  rank: string;
  summonerName: string;
  combinedLP: number = 0;

  constructor(
    index: number,
    lp: number,
    tier: string,
    rank: string,
    summonerName: string
  ) {
    this.index = index;
    this.lp = lp;
    this.tier = tier;
    this.rank = rank;
    this.summonerName = summonerName;
  }
}

export const DefaultPlayers: OTPPlayerProps[] = [
  new OTPPlayerProps(2, 50, "MASTER", "I", "Fat Houdini"),
  new OTPPlayerProps(1, 90, "MASTER", "I", "Random OTP#2"),
  new OTPPlayerProps(
    3,
    1200,
    "CHALLENGER",
    "I",
    "e7c3c0fd-cee3-4399-877b-baf89c9f6f46"
  ),
];
