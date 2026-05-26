import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Settings, Soullink, TRAINER_COLORS } from "../../../types/Pokemon";

interface SoullinkTeamHeaderProps {
  state: Soullink;
  initialTrainerNames: string[];
  settings: Settings;
  onTrainerNameChange: (index: number, newName: string) => void;
}

const SoullinkTeamHeader: React.FC<SoullinkTeamHeaderProps> = ({
  state,
  initialTrainerNames,
  onTrainerNameChange,
  settings,
}) => {
  const [trainerNames, setTrainerNames] = useState<string[]>(initialTrainerNames);

  useEffect(() => {
    setTrainerNames(state.trainers.map((t) => t.name));
  }, [initialTrainerNames]);

  const handleNameChange = (index: number, newName: string) => {
    setTrainerNames((prev) => {
      const newNames = [...prev];
      newNames[index] = newName;
      return newNames;
    });
  };

  return (
    <Row className="centerR soullink-desc-heaader">
      {Array.from({ length: settings.participants }, (_, index) => (
        <div className="centerR">
          <input
            key={index}
            type="text"
            value={trainerNames[index] ?? ""}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTrainerNameChange(index, trainerNames[index]);
              }
            }}
            className="blackOutline"
            style={{ color: TRAINER_COLORS[index] }}
          />
          {state.trainers[index].deaths}
        </div>
      ))}
      <div>{"Runs: " + state.runs}</div>
    </Row>
  );
};

export default SoullinkTeamHeader;
