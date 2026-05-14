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
            className={
              "lms-boardObject " + (admin && !object.revealed ? "lms-boardObjectAdmin" : "")
            }
            onClick={() => handleRevealOne(index)}
          >
            {(object.revealed || (admin && !object.revealed)) && (
              <div className={!object.revealed ? "lms-boardObjectHidden" : ""}>
                <img
                  className="lms-boardObjectImg"
                  // src={"../../lastmanstanding/objects/" + object.name + ".png"}
                  src="../../lastmanstanding/objects/hidden.png"
                  alt=""
                />
                <div>{object.name}</div>
              </div>
            )}
            {!object.revealed && !admin && (
              <img
                className="lms-boardObjectHiddenImg"
                src="../../lastmanstanding/objects/hidden.png"
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LMSBoard;
