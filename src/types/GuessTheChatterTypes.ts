export class Chatter {
    name: string;
    profilePic: string;
    isSubscribed: boolean;
    id: string

    constructor(id: string, name: string, profilePic: string, isSubscribed: boolean) {
        this.id = id;
        this.name = name;
        this.profilePic = profilePic;
        this.isSubscribed = isSubscribed;
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