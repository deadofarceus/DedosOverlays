import { Button } from "react-bootstrap";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import { useAudioSettings } from "../../../context/AudioSettingsContext";

interface BoardControlProps {
  gamestate: LMSGameState;
  sendState: (newState: LMSGameState) => void;
}

let soundWS: BroadcastWebsocket<string>;

function BoardControls({ gamestate, sendState }: BoardControlProps) {
  const currentPlayer = gamestate.players[gamestate.currentPlayer];
  const { buzzerVolume } = useAudioSettings();
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundeffect, setSoundeffect] = useState<string>("");

  useEffect(() => {
    if (id && !soundWS) {
      soundWS = new BroadcastWebsocket<string>(id + "_soundeffect", setSoundeffect);
    }
  }, []);

  useEffect(() => {
    if (soundeffect === "") {
      return;
    }
    const src = `/lastmanstanding/audio/${encodeURIComponent(soundeffect)}`;
    const audio = new Audio(src);
    audio.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
    audioRef.current = audio;
    audio.play();
    audio.addEventListener("ended", () => {
      setSoundeffect("");
    });
  }, [soundeffect]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
  }, [buzzerVolume]);

  const handleSkipPlayer = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentPlayer = getNextPlayer();
    sendState(newGamestate);
  };

  const handleWrongAnswer = () => {
    const newGamestate = { ...gamestate };

    if (newGamestate.round.participants.length === 1) {
      return;
    }

    if(newGamestate.boards[gamestate.currentBoard].objects.every((object) => object.revealed)) {
      return;
    }

    newGamestate.players[newGamestate.currentPlayer].lifes--;

    newGamestate.round.results.push({
      playerName: newGamestate.players[newGamestate.currentPlayer].name,
      rightAnswer: false,
      lifes: newGamestate.players[newGamestate.currentPlayer].lifes,
    });

    soundWS.sendData("error.wav");

    if (newGamestate.round.results.length >= newGamestate.round.participants.length) {
      const playersDroppedToZero = newGamestate.round.results
        .filter((v) => v.lifes === 0)
        .map((v) => v.playerName);

      if (
        newGamestate.players[newGamestate.currentPlayer].lifes === 0 &&
        playersDroppedToZero.length === newGamestate.round.results.length &&
        newGamestate.round.results.every((v) => !v.rightAnswer)
      ) {
        newGamestate.players.forEach((player) => {
          if (playersDroppedToZero.includes(player.name)) {
            player.lifes = 1;
          }
        });
      } else {
        playersDroppedToZero.forEach((playerName) => {
          newGamestate.players.forEach((player) => {
            if (player.name === playerName) {
              player.points += 4 - newGamestate.round.participants.length;
            }
          });
        });
      }

      newGamestate.round.participants = newGamestate.players.filter((player) => player.lifes > 0);
      if (newGamestate.round.participants.length === 1) {
        newGamestate.players.forEach((player) => {
          if (player.name === newGamestate.round.participants[0].name) {
            player.points += 3;
          }
        });
      }

      newGamestate.round.results = [];
    }

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
    newGamestate.currentPlayer = newGamestate.currentBoard % gamestate.players.length;
    newGamestate.players.forEach((player) => {
      player.lifes = 3;
    });
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

    if (newGamestate.round.participants.length !== 1) {
      newGamestate.players.forEach((player) => {
        if (player.lifes > 0) {
          player.points += 4 - newGamestate.round.participants.length;
        }
      });
    }
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
