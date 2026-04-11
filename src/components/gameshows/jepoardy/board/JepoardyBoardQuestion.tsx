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

  const category = gamestate.currentBoard.categories.find(
    (cat) => questions[0].category === cat.name
  );

  const handleOnClick = () => {
    if (
      questions[0].extra !== "Taunt" &&
      gamestate.currentBoard.categories.some((cat) =>
        cat.questions.some((q) => q[0].extra === "Taunt" && !q[0].finished)
      )
    ) {
      return;
    }

    if (category?.extra === "forced") {
      return;
    }
    if (questions[0].finished || admin === "") {
      return;
    }
    const newGamestate = { ...gamestate };
    if (questions.length > 1) {
      newGamestate.state = "RANDOMQUESTION";
      newGamestate.currentRandomQuestions = questions;
      console.log(newGamestate.currentRandomQuestions);
    } else {
      newGamestate.state = "QUESTION";
      newGamestate.currentQuestion = questions[0];
      console.log(newGamestate.currentQuestion);
    }

    sendState(newGamestate);
  };

  let classname = "jp-category-question " + admin;
  if (questions[0].finished) {
    classname += "jp-Inactive";
  } else {
    classname += "jp-" + questions[0].extra;
  }

  if (
    (questions[0].extra !== "Taunt" &&
      gamestate.currentBoard.categories.some((cat) =>
        cat.questions.some((q) => q[0].extra === "Taunt" && !q[0].finished)
      )) ||
    category?.extra === "forced"
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
