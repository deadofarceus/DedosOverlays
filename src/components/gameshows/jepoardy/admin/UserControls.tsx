import { Col, Form, InputGroup } from "react-bootstrap";
import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";
import { useState } from "react";
import PlayerControl from "./PlayerControl";
import { useQuery } from "../../../../types/UsefulFunctions";
import DedoCopy from "../../../util/DedoCopy";

function UserControls({ gamestate, sendState }: JepoardyGameProps) {
  const [points, setPoints] = useState<number>(100);
  const [password, setPassword] = useState<string>("");
  const data = gamestate;

  const query = useQuery();
  const id = query.get("id");

  return (
    <div className="w-100 centerC">
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

        <div className="centerC w-75">
          <div>VDO Ninja Raum Link: (einmal im neuen tab öffnen und offen lassen)</div>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={`https://vdo.ninja/?director=${id}&password=${password}`}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />

            <DedoCopy textToCopy={`https://vdo.ninja/?director=${id}&password=${password}`} />
          </InputGroup>
        </div>

        <div className="centerC w-75">
          <div>DEIN VDO Ninja Camera Link:</div>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={`https://vdo.ninja/?room=${id}&hash=c4db&q&push=Autophil`}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />

            <DedoCopy textToCopy={`https://vdo.ninja/?room=${id}&hash=c4db&q&push=Autophil`} />
          </InputGroup>
        </div>

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
