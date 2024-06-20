import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
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
      <Button
        size="lg"
        variant="primary"
        className="mb-3 w-50"
        onClick={() => {
          player.bosses[player.currentBoss].deaths.push(percentage);
          callback(
            new Player(
              player.id,
              player.name,
              player.bosses,
              player.currentBoss
            )
          );
        }}
      >
        {"New Death " + percentage + "%"}
      </Button>
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
      {current.name !== "Other Monsters or Heights" &&
        !current.secondPhase &&
        percentage === 0 && (
          <Button
            size="lg"
            variant="secondary"
            className="mt-3"
            onClick={() => {
              current.secondPhase = true;
              for (let i = 0; i < current.deaths.length; i++) {
                current.deaths[i] = current.deaths[i] += 100;
              }
              callback(
                new Player(
                  player.id,
                  player.name,
                  player.bosses,
                  player.currentBoss
                )
              );
            }}
          >
            Enable Second Phase
          </Button>
        )}
    </Col>
  );
}

export default ControlPanel;
