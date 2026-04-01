import { Button, Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

interface VDOLinkProps {
  index: number;
  name: string;
  handleChange: (index: number, name: string) => void;
}

function VDOLink({ index, name, handleChange }: VDOLinkProps) {
  const [nameState, setNameState] = useState<string>(name);

  useEffect(() => {
    setNameState(name);
  }, [name]);

  const handleSave = () => {
    handleChange(index, nameState);
  };

  return (
    <Container
      className="AIC-memberSettings mb-3 p-3 border rounded"
      style={{ left: `${index * 420 + 420}px` }}
    >
      <div className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div className="d-flex gap-2">
        <Button onClick={handleSave} variant="success">
          Save
        </Button>
      </div>
    </Container>
  );
}

export default VDOLink;
