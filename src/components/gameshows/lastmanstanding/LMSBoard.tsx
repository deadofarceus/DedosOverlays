import { useEffect } from "react";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import { useQuery } from "../../../types/UsefulFunctions";

interface LMSBoardProps {
  sendState: (newState: LMSGameState) => void;
  gamestate: LMSGameState;
}

let soundWS: BroadcastWebsocket<string>;

function LMSBoard({ gamestate, sendState }: LMSBoardProps) {
  const admin = window.location.href.includes("admin");
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }

  useEffect(() => {
    if (id && !soundWS) {
      soundWS = new BroadcastWebsocket<string>(id + "_soundeffect");
    }
  }, []);

  const handleRevealOne = (index: number) => {
    const newGamestate = { ...gamestate };
    newGamestate.boards[newGamestate.currentBoard].objects[index].revealed = true;

    newGamestate.round.results.push({
      playerName: newGamestate.players[newGamestate.currentPlayer].name,
      rightAnswer: true,
      lifes: newGamestate.players[newGamestate.currentPlayer].lifes,
    });

    if (Math.random() > 0.5) {
      soundWS.sendData("bling1.mp3");
    } else {
      soundWS.sendData("bling2.mp3");
    }

    if (
      newGamestate.round.results.length >=
      newGamestate.players.filter((player) => player.lifes > 0).length
    ) {
      const playersDroppedToZero = newGamestate.round.results
        .filter((v) => v.lifes === 0)
        .map((v) => v.playerName);

      playersDroppedToZero.forEach((playerName) => {
        newGamestate.players.forEach((player) => {
          if (player.name === playerName) {
            player.points += 4 - newGamestate.round.participants.length;
          }
        });
      });

      newGamestate.round.participants = newGamestate.players.filter((player) => player.lifes > 0);
      if (newGamestate.round.participants.length === 1) {
        newGamestate.players.forEach((player) => {
          if (player.name === newGamestate.round.participants[0].name) {
            player.points += 3;
          }
        });
      }
      if (newGamestate.boards[gamestate.currentBoard].objects.every((object) => object.revealed)) {
        newGamestate.players.forEach((player) => {
          player.points += player.lifes;
        });
      }
    }

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
