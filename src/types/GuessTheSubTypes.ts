export class Chatter {
  name: string;
  profilePic: string;
  isSubscribed: boolean;
  id: string;
  subIcon: string;

  constructor(
    id: string,
    name: string,
    profilePic: string,
    isSubscribed: boolean,
    subIcon: string
  ) {
    this.id = id;
    this.name = name;
    this.profilePic = profilePic;
    this.isSubscribed = isSubscribed;
    this.subIcon = subIcon;
  }
}

export class ChatterD {
  chatter: Chatter;
  onGuess: (isSub: boolean) => void;
  constructor(chatter: Chatter, onGuess: (isSub: boolean) => void) {
    this.chatter = chatter;
    this.onGuess = onGuess;
  }
}
