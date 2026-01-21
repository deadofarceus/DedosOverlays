import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import JepoardyCategory from "./JepoardyCategory";
import JepoardyQuestion from "./JepoardyQuestion";

function JepoardyBoard({ gamestate }: JepoardyGameProps) {
  if (gamestate.board.state === "START") {
    return <h1>START</h1>;
  }
  if (gamestate.board.state === "QUESTION") {
    return <JepoardyQuestion question={gamestate.board.question} />;
  }
  if (gamestate.board.state === "BOARD") {
    return (
      <div>
        {gamestate.board.categories.map((cat, index) => (
          <JepoardyCategory key={index} category={cat} />
        ))}
      </div>
    );
  }
}

export default JepoardyBoard;
