import { Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

interface VDOLinkProps {
  link: string;
  index: number;
  handleChange: (index: number, link: string) => void;
}

function VDOLink({ link, index, handleChange }: VDOLinkProps) {
  const [linkState, setLinkState] = useState<string>(link);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        value={linkState}
        aria-describedby="basic-addon2"
        className="link"
        onChange={(e) => setLinkState(e.target.value)}
      />

      <Button onClick={() => handleChange(index, linkState)}>Change</Button>
    </InputGroup>
  );
}

export default VDOLink;
