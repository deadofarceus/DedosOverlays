import { Button } from "react-bootstrap";
import { useState } from "react";
import { LMSGameState, LMSPlayer } from "../../../types/gameshows/LastManStanding";
import VDOLink from "../kiKombiniert/VDOLink";

interface PlayerControlProps {
  player: LMSPlayer;
  index: number;
  gamestate: LMSGameState;
  points: number;
  sendState: (newState: LMSGameState) => void;
}

function PlayerControl({ player, index, points, gamestate, sendState }: PlayerControlProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleNameChange = (index: number, name: string) => {
    const lmsp: LMSPlayer = { ...player, name: name };
    const newLmsps = [...gamestate.players];
    newLmsps[index] = lmsp;

    sendState({ ...gamestate, players: newLmsps });
    setIsSettingsOpen(false);
  };

  const handlePoints = (points: number) => {
    const lmsp: LMSPlayer = { ...player, points: player.points + points };
    const newLmsps = [...gamestate.players];
    newLmsps[index] = lmsp;

    sendState({ ...gamestate, players: newLmsps });

    setIsSettingsOpen(false);
  };

  const handleLifes = (lifes: number) => {
    const lmsp: LMSPlayer = { ...player, lifes: player.lifes + lifes };
    const newLmsps = [...gamestate.players];
    newLmsps[index] = lmsp;

    sendState({ ...gamestate, players: newLmsps });

    setIsSettingsOpen(false);
  };

  return (
    <div className="centerR lms-playerPointsControl">
      <div className="AIc-member">
        {player.name} {` {${player.points}}`}
      </div>
      <div>
        <>
          <Button
            onClick={() => handlePoints(points)}
            variant="success"
            className="lms-Pointbutton"
          >
            {`+${points}`}
          </Button>
          <Button
            onClick={() => handlePoints(-points)}
            variant="danger"
            className="lms-Pointbutton"
          >
            {`-${points}`}
          </Button>
        </>

        <>
          <Button onClick={() => handleLifes(1)} variant="success" className="lms-Pointbutton">
            {`❤️`}
          </Button>
          <Button onClick={() => handleLifes(-1)} variant="secondary" className="lms-Pointbutton">
            {`💔`}
          </Button>
        </>

        <Button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          variant="secondary"
          title="Settings"
        >
          ⚙️
        </Button>
        {isSettingsOpen && (
          <>
            <VDOLink key={0} index={0} name={player.name} handleChange={handleNameChange} />
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerControl;
