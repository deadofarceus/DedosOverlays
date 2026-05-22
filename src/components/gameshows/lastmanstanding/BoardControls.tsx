import { Button } from "react-bootstrap";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";

interface BoardControlProps {
  gamestate: LMSGameState;
  sendState: (newState: LMSGameState) => void;
}

function BoardControls({ gamestate, sendState }: BoardControlProps) {
  const currentPlayer = gamestate.players[gamestate.currentPlayer];

  const handleSkipPlayer = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentPlayer = getNextPlayer();
    sendState(newGamestate);
  };

  const handleWrongAnswer = () => {
    const newGamestate = { ...gamestate };
    newGamestate.players[newGamestate.currentPlayer].lifes--;
    newGamestate.currentPlayer = getNextPlayer();
    sendState(newGamestate);
  };

  const getNextPlayer = (): number => {
    let nextPlayer = (gamestate.currentPlayer + 1) % gamestate.players.length;
    let times = 0;
    while (gamestate.players[nextPlayer].lifes === 0 && times < gamestate.players.length) {
      nextPlayer = (nextPlayer + 1) % gamestate.players.length;
      times++;
    }
    return nextPlayer;
  };

  const handleNextBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentBoard = (newGamestate.currentBoard + 1) % newGamestate.boards.length;
    sendState(newGamestate);
  };

  const handlePrevBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentBoard = (newGamestate.currentBoard - 1) % newGamestate.boards.length;
    sendState(newGamestate);
  };

  const handleRevealAll = () => {
    const newGamestate = { ...gamestate };
    newGamestate.boards[newGamestate.currentBoard].objects.forEach((object) => {
      object.revealed = true;
    });
    sendState(newGamestate);
  };

  return (
    <div className="centerR lms-boardcontrols">
      <div>
        <Button onClick={handleSkipPlayer}>Nächster Spieler</Button>
        <Button
          onClick={handleWrongAnswer}
          variant="danger"
        >{`Falsche Antwort von ${currentPlayer.name}`}</Button>
      </div>
      <Button onClick={handleRevealAll} variant="warning">
        Alles Aufdecken
      </Button>

      <div>
        <Button onClick={handleNextBoard} variant="success">
          Nächstes Board
        </Button>
        <Button onClick={handlePrevBoard} variant="warning">
          Board Zurück
        </Button>
      </div>
    </div>
  );
}

export default BoardControls;
