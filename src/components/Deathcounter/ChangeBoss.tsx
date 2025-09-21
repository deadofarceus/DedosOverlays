import { Button, Card, Col, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Boss, Player } from "../../types/DeathcounterTypes";
import { useState } from "react";

interface ChangeBossProps {
  player: Player;
  callback: (index: number) => void;
}

function ChangeBoss({ player, callback }: ChangeBossProps) {
  const [boss, setBoss] = useState<string>("");
  return (
    <Col xs={3}>
      <h3>New Boss:</h3>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={boss}
          placeholder="Enter new Boss name"
          aria-describedby="basic-addon2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoss(e.target.value)}
        />
        <Button
          variant="success"
          id="button-addon2"
          onClick={() => {
            if (!player.bosses.find((b) => b.name === boss) && boss !== "") {
              player.bosses.push(new Boss(boss, undefined, false));
            }
            callback(player.bosses.length - 1);
          }}
        >
          Create
        </Button>
      </InputGroup>
      <h2>Change Boss</h2>
      <Card className="changeBossContainer">
        <div className="scrollable-list">
          <ListGroup variant="flush">
            {player.bosses.map((b, index) => (
              <ListGroup.Item
                key={index}
                className="changeBossItem"
                onClick={() => {
                  callback(index);
                }}
              >
                {b.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card>
    </Col>
  );
}

export default ChangeBoss;
