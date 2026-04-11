import { useEffect, useState } from "react";
import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import { BroadcastWebsocket } from "../../../../types/WebsocketTypes";
import JepoardyCategory from "./JepoardyCategory";
import JepoardyQuestion from "./JepoardyQuestion";
import { useQuery } from "../../../../types/UsefulFunctions";
import JepoardyRandomQuestion from "./JepoardyRandomQuestion";

let ws: BroadcastWebsocket<string>;

function JepoardyBoard({ gamestate, sendState }: JepoardyGameProps) {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  const [radDrehen, setRadDrehen] = useState<string>("");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (radDrehen.startsWith("DREHDASRAD")) {
      const target = Number(radDrehen.split("_")[1]);

      // Reset ohne Animation
      setIsSpinning(false);
      setRotation(0);

      // nächster Frame → Animation
      requestAnimationFrame(() => {
        setIsSpinning(true);
        setRotation(target);
      });
    }
  }, [radDrehen]);

  useEffect(() => {
    if (!ws) {
      ws = new BroadcastWebsocket<string>(id + "_STARTSTOP", setRadDrehen);
    }
  }, []);

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
  if (gamestate.state === "RANDOMQUESTION") {
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
        <JepoardyRandomQuestion
          questions={gamestate.currentRandomQuestions}
          gamestate={gamestate}
          sendState={sendState}
        />
      </div>
    );
  }
  if (gamestate.state === "QUESTION") {
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
        <JepoardyQuestion
          question={gamestate.currentQuestion}
          gamestate={gamestate}
          sendState={sendState}
        />
      </div>
    );
  }
  if (gamestate.state === "BOARD") {
    const radDrehenStyle = {
      transform: `rotate(${rotation}deg)`,
      transition: isSpinning ? "transform 8s cubic-bezier(.25,.5,.25,1)" : "none",
    };
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
        {gamestate.currentBoard.extra === "DREHDASRAD" && (
          <div className="jp-RadContainer">
            <img className="jp-RadMarkierung" src="../../jepoardy/Rad_Markierung.png" alt="" />
            <img
              className={radDrehen === "DREHDASRAD" ? "jp-RadOverlay" : "jp-RadOverlayHidden"}
              src="../../jepoardy/Rad_Overlay.png"
              alt=""
            />
            <img
              className={
                "jp-Rad " + (radDrehen.startsWith("DREHDASRAD") ? "jp-RadDrehtSich" : "jp-Radkommt")
              }
              style={radDrehenStyle}
              src="../../jepoardy/Rad.png"
              alt=""
            />
          </div>
        )}
      </div>
    );
  }
}

export default JepoardyBoard;
