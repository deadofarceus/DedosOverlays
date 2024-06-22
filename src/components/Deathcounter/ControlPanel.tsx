import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Player, PlayerD } from "../../types/DeathcounterTypes";

function ControlPanel({ player, callback }: PlayerD) {
  const [percentage, setPercentage] = useState<number>(100);
  const current = player.bosses[player.currentBoss];
  const HPARRAY = current.secondPhase
    ? [0, 50, 100, 150, 200]
    : [0, 25, 50, 75, 100];

  const maximumHP = current.secondPhase ? 200 : 100;

  return (
    <Col xs={4} className="w-75">
      <h2>{current.name}</h2>
      <Row className="w-100 centerR">
        <Button
          size="lg"
          variant="primary"
          className="w-50 deathbutton"
          onClick={() => {
            player.bosses[player.currentBoss].deaths.push(percentage);
            callback(
              new Player(
                player.id,
                player.name,
                player.bosses,
                player.currentBoss,
                player.triesInGraph,
                player.showAll
              )
            );
          }}
        >
          {"New Death " + percentage + "%"}
        </Button>
        <Button
          className="w-25 deathbutton"
          variant="warning"
          onClick={() => {
            player.bosses[player.currentBoss].deaths.pop();
            callback(
              new Player(
                player.id,
                player.name,
                player.bosses,
                player.currentBoss,
                player.triesInGraph,
                player.showAll
              )
            );
          }}
        >
          Delete last death
        </Button>
      </Row>
      {current.name !== "Other Monsters or Heights" && (
        <Form.Group className="percentageGroup">
          <Form.Label className="formlabel">HP Left %</Form.Label>
          <div className="percentageSliderLabels">
            {HPARRAY.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
          <Form.Range
            max={maximumHP}
            min={0}
            step={1}
            defaultValue={100}
            className="percentageSlider"
            onChange={(event) => {
              setPercentage(parseInt(event.target.value));
            }}
          />
        </Form.Group>
      )}
      {current.name !== "Other Monsters or Heights" && percentage === 0 && (
        <Button
          size="lg"
          variant="secondary"
          className="mt-3"
          onClick={() => {
            current.secondPhase = !current.secondPhase;
            for (let i = 0; i < current.deaths.length; i++) {
              if (current.secondPhase) {
                current.deaths[i] = current.deaths[i] += 100;
              } else {
                current.deaths[i] = current.deaths[i] -= 100;
              }
            }
            callback(
              new Player(
                player.id,
                player.name,
                player.bosses,
                player.currentBoss,
                player.triesInGraph,
                player.showAll
              )
            );
          }}
        >
          {!current.secondPhase
            ? "Enable Second Phase"
            : "Disable Second Phase"}
        </Button>
      )}
    </Col>
  );
}

export default ControlPanel;
