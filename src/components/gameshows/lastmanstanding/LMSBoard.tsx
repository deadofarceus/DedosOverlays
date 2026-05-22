import { LMSGameState } from "../../../types/gameshows/LastManStanding";

interface LMSBoardProps {
  sendState: (newState: LMSGameState) => void;
  gamestate: LMSGameState;
}

function LMSBoard({ gamestate, sendState }: LMSBoardProps) {
  const admin = window.location.href.includes("admin");

  const handleRevealOne = (index: number) => {
    const newGamestate = { ...gamestate };
    newGamestate.boards[newGamestate.currentBoard].objects[index].revealed = true;
    newGamestate.currentPlayer = getNextPlayer();
    sendState(newGamestate);
  };

  const getNextPlayer = (): number => {
    let nextPlayer = (gamestate.currentPlayer + 1) % gamestate.players.length;
    while (gamestate.players[nextPlayer].lifes === 0) {
      nextPlayer = (nextPlayer + 1) % gamestate.players.length;
    }
    return nextPlayer;
  };

  const currentBoard = gamestate.boards[gamestate.currentBoard];

  return (
    <div className="lms-board">
      <h1 className="lms-boardTitle">{currentBoard.title}</h1>
      <div className="lms-boardObjects">
        {currentBoard.objects.map((object, index) => (
          <div
            key={index}
            className={[
              "lms-boardObject",
              object.revealed && "lms-boardObject--revealed",
              admin && !object.revealed && "lms-boardObjectAdmin",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => (admin && !object.revealed ? handleRevealOne(index) : undefined)}
          >
            {(object.revealed || (admin && !object.revealed)) && (
              <div
                className={[
                  "lms-boardObjectContent",
                  !object.revealed && "lms-boardObjectContent--preview",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <img
                  className="lms-boardObjectImg"
                  // src={"../../lastmanstanding/objects/" + object.name + ".png"}
                  src="../../lastmanstanding/objects/hidden.png"
                  alt=""
                />
                <span className="lms-boardObjectLabel">{object.name}</span>
              </div>
            )}
            {!object.revealed && !admin && (
              <div className="lms-boardObjectMystery">
                <img
                  className="lms-boardObjectHiddenImg"
                  src="../../lastmanstanding/objects/hidden.png"
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LMSBoard;
