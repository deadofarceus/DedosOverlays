import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import JepoardyCategory from "./JepoardyCategory";
import JepoardyQuestion from "./JepoardyQuestion";

function JepoardyBoard({ gamestate, sendState }: JepoardyGameProps) {
  if (gamestate.state === "START") {
    return (
      <div className="jp-board">
        {gamestate.currentBoard.categories.map((cat, index) => (
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
  if (gamestate.state === "QUESTION") {
    return (
      <div className="jp-board">
        <JepoardyQuestion
          question={gamestate.currentQuestion}
          gamestate={gamestate}
          sendState={sendState}
        />
      </div>
    );
  }
  if (gamestate.state === "BOARD") {
    return (
      <div className="jp-board">
        {gamestate.currentBoard.categories.map((cat, index) => (
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
