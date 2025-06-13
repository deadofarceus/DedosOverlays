import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

interface SoullinkTeamHeaderProps {
  initialTrainerNames: string[];
  onTrainerNameChange: (index: number, newName: string) => void;
}

const SoullinkTeamHeader: React.FC<SoullinkTeamHeaderProps> = ({
  initialTrainerNames,
  onTrainerNameChange,
}) => {
  const [trainerNames, setTrainerNames] = useState<string[]>(initialTrainerNames);

  useEffect(() => {
    setTrainerNames(initialTrainerNames);
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
      <h2 style={{ marginLeft: "34px" }}>Route</h2>
      <input
        type="text"
        value={trainerNames[0]}
        onChange={(e) => handleNameChange(0, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onTrainerNameChange(0, trainerNames[0]);
          }
        }}
        style={{
          marginLeft: "43px",
        }}
      />
      <input
        type="text"
        value={trainerNames[1]}
        onChange={(e) => handleNameChange(1, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onTrainerNameChange(1, trainerNames[1]);
          }
        }}
        style={{
          marginLeft: "146px",
        }}
      />
    </Row>
  );
};

export default SoullinkTeamHeader;
