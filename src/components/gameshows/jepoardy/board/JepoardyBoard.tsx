import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import JepoardyCategory from "./JepoardyCategory";
import JepoardyQuestion from "./JepoardyQuestion";

function JepoardyBoard({ gamestate }: JepoardyGameProps) {
  if (gamestate.board.state === "START") {
    return (
      <div className="jp-board">
        {gamestate.board.categories.map((cat, index) => (
          <JepoardyCategory key={index} category={cat} />
        ))}
      </div>
    );
  }
  if (gamestate.board.state === "QUESTION") {
    return (
      <div className="jp-board">
        <JepoardyQuestion question={gamestate.board.question} />
      </div>
    );
  }
  if (gamestate.board.state === "BOARD") {
    return (
      <div className="jp-board">
        {gamestate.board.categories.map((cat, index) => (
          <JepoardyCategory key={index} category={cat} />
        ))}
      </div>
    );
  }
}

export default JepoardyBoard;
