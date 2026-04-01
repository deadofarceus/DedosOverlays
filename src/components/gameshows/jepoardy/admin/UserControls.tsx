import { Col, Form } from "react-bootstrap";
import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import { useState } from "react";
import PlayerControl from "./PlayerControl";

function UserControls({ gamestate, sendState }: JepoardyGameProps) {
  const [password, setPassword] = useState<string>("");
  const data = gamestate;

  return (
    <div>
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

        {data.players.map((player, index) => (
          <PlayerControl
            key={index}
            player={player}
            index={index}
            gamestate={gamestate}
            sendState={sendState}
          />
        ))}
      </Col>
    </div>
  );
}

export default UserControls;
