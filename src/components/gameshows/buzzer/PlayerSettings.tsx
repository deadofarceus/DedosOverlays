import { Button, Form } from "react-bootstrap";
import { Player } from "../../../types/gameshows/Buzzer";

interface PlayerProps {
  id: number;
  player: Player;
  handleChangePlayer: (id: number, player: Player) => void;
  handleRemovePlayer: (id: number) => void;
}

function PlayerSettings({ id, player, handleChangePlayer, handleRemovePlayer }: PlayerProps) {
  return (
    <div className="buzzer-playerSettings">
      <div className="mb-3">
        <Form.Control
          type="text"
          value={player.name}
          onChange={(e) => handleChangePlayer(id, { ...player, name: e.target.value })}
          placeholder="Enter name"
        />
      </div>
      <div className="buzzer-playerPoints">
        <div>{player.points}</div>
        <Button
          onClick={() => handleChangePlayer(id, { ...player, points: player.points + 1 })}
          variant="success"
        >
          +1
        </Button>
        <Button
          onClick={() => handleChangePlayer(id, { ...player, points: player.points + 1 })}
          variant="danger"
        >
          -1
        </Button>
      </div>
      <div>
        <Button onClick={() => handleRemovePlayer(id)} variant="warning">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default PlayerSettings;
