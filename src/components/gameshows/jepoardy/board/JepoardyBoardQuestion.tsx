import { JepoardyGameState, Question } from "../../../../types/gameshows/Jepoardy";

interface JepoardyBoardQuestionProps {
  questions: Question[];
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
}

function JepoardyBoardQuestion({ questions, gamestate, sendState }: JepoardyBoardQuestionProps) {
  let admin = "";
  if (window.location.href.includes("admin") && !questions[0].finished) {
    admin = "jp-adminQuestion ";
  }

  const handleOnClick = () => {
    if (
      questions[0].extra !== "Taunt" &&
      gamestate.currentBoard.categories.some((cat) =>
        cat.questions.some((q) => q[0].extra === "Taunt")
      )
    ) {
      return;
    }
    if (questions[0].finished || admin === "") {
      return;
    }
    const newGamestate = { ...gamestate };
    newGamestate.state = "QUESTION";
    let question: Question = questions[0];
    if (questions.length > 1) {
      question = questions[Math.floor(Math.random() * questions.length)]; //TODO animation
    }
    newGamestate.currentQuestion = question;
    sendState(newGamestate);
  };

  let classname = "jp-category-question " + admin;
  if (questions[0].finished) {
    classname += "jp-Inactive";
  } else {
    classname += "jp-" + questions[0].extra;
  }

  if (
    questions[0].extra !== "Taunt" &&
    gamestate.currentBoard.categories.some((cat) =>
      cat.questions.some((q) => q[0].extra === "Taunt")
    )
  ) {
    classname += " jp-Taunted";
  }

  return (
    <div className={classname} onClick={handleOnClick}>
      <p>{questions[0].points}</p>
    </div>
  );
}

export default JepoardyBoardQuestion;
