import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";
import PlayerControl from "./PlayerControl";

interface UserControlsProps {
  gamestate: LMSGameState;
  sendState: (newState: LMSGameState) => void;
}

function UserControls({ gamestate, sendState }: UserControlsProps) {
  const [points, setPoints] = useState<number>(1);
  const [password, setPassword] = useState<string>("");
  const data = gamestate;

  return (
    <div className="lms-userControls">
      <h1>User Controls</h1>
      <Col className="centerC w-75 p-0">
        <Form.Control
          type="text"
          placeholder="Room password"
          value={password}
          className={
            "buzzerUserInput " + (password !== data.password ? "passwordChanging" : "passwordSaved")
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
              sendState({ ...data, password: password });
            }
          }}
        />

        <Form.Group className="my-3 w-100" controlId="pointsInput">
          <Form.Label>Punkte (Points)</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoints(Number(e.target.value))}
            min={0}
          />
        </Form.Group>

        {data.players.map((player, index) => (
          <PlayerControl
            key={index}
            player={player}
            index={index}
            points={points}
            gamestate={gamestate}
            sendState={sendState}
          />
        ))}
      </Col>
    </div>
  );
}

export default UserControls;
