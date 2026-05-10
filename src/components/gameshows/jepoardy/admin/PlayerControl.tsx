import { Button } from "react-bootstrap";
import { JepoardyGameState, JepoardyPlayer } from "../../../../types/gameshows/Jepoardy";
import VDOLink from "../../kiKombiniert/VDOLink";
import { useState } from "react";

interface PlayerControlProps {
  player: JepoardyPlayer;
  index: number;
  gamestate: JepoardyGameState;
  points: number;
  sendState: (newState: JepoardyGameState) => void;
}

function PlayerControl({ player, index, points, gamestate, sendState }: PlayerControlProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleNameChange = (index: number, name: string) => {
    const jpp: JepoardyPlayer = { ...player, name: name };
    const newJpps = [...gamestate.players];
    newJpps[index] = jpp;

    sendState({ ...gamestate, players: newJpps });
    setIsSettingsOpen(false);
  };

  const handlePoints = (points: number) => {
    const jpp: JepoardyPlayer = { ...player, points: player.points + points };
    const newJpps = [...gamestate.players];
    newJpps[index] = jpp;

    sendState({ ...gamestate, players: newJpps });

    setIsSettingsOpen(false);
  };

  return (
    <div className="centerR jp-playerPointsControl">
      <div className="AIc-member">
        {player.name} {` {${player.points}}`}
      </div>
      <div>
        <>
          <Button onClick={() => handlePoints(points)} variant="success" className="AIcPointbutton">
            {`+${points}`}
          </Button>
          <Button onClick={() => handlePoints(-points)} variant="danger" className="AIcPointbutton">
            {`-${points}`}
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
