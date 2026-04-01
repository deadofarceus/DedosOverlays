import { Button } from "react-bootstrap";
import { JepoardyGameState, JepoardyPlayer } from "../../../../types/gameshows/Jepoardy";
import VDOLink from "../../kiKombiniert/VDOLink";
import { useState } from "react";

interface PlayerControlProps {
  player: JepoardyPlayer;
  index: number;
  gamestate: JepoardyGameState;
  sendState: (newState: JepoardyGameState) => void;
}

function PlayerControl({ player, index, gamestate, sendState }: PlayerControlProps) {
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
    <div className="centerR">
      <div className="AIc-member">
        {player.name} {` {${player.points}}`}
      </div>
      <>
        <Button onClick={() => handlePoints(100)} variant="success" className="AIcPointbutton">
          +100
        </Button>
        <Button onClick={() => handlePoints(-100)} variant="danger" className="AIcPointbutton">
          -100
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
  );
}

export default PlayerControl;
