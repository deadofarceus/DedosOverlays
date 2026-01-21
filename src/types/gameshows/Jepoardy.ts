interface JepoardyGameState {
    admin: JepoardyAdmin;
    players: JepoardyPlayer[];
    board: Board;
    buzzerlist: string[];
}

interface JepoardyAdmin {
    name: string;
    vdoNinjaLink: string;
}

interface JepoardyPlayer {
    name: string;
    points: number;
    vdoNinjaLink: string;
    turn: boolean;
    buzzed: boolean;
}

interface Board {
    categories: Category[];
}

interface Category {
    name: string;
    questions: Question[];
}

interface Question {
    category: string;
    points: number;
    type: "AUDIO" | "IMAGE" | "TEXT" | "VIDEO";
    question: string;
    answertype: "VIDEO" | "TEXT";
    answer: string;
}