import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import JepoardyCategory from "./JepoardyCategory";
import JepoardyQuestion from "./JepoardyQuestion";

function JepoardyBoard({ gamestate, sendState }: JepoardyGameProps) {
  if (gamestate.board.state === "START") {
    return (
      <div className="jp-board">
        {gamestate.board.categories.map((cat, index) => (
          <JepoardyCategory
            key={index}
            category={cat}
            gamestate={gamestate}
            sendState={sendState}
          />
        ))}
      </div>
    );
  }
  if (gamestate.board.state === "QUESTION") {
    return (
      <div className="jp-board">
        <JepoardyQuestion
          question={gamestate.board.question}
          gamestate={gamestate}
          sendState={sendState}
        />
      </div>
    );
  }
  if (gamestate.board.state === "BOARD") {
    return (
      <div className="jp-board">
        {gamestate.board.categories.map((cat, index) => (
          <JepoardyCategory
            key={index}
            category={cat}
            gamestate={gamestate}
            sendState={sendState}
          />
        ))}
      </div>
    );
  }
}

export default JepoardyBoard;
