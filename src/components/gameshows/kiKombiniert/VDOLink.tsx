import { Button, Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Member } from "../../../types/gameshows/AICombine";

interface VDOLinkProps {
  index: number;
  member: Member;
  handleChange: (index: number, link: string, name: string) => void;
}

function VDOLink({ index, member, handleChange }: VDOLinkProps) {
  const [linkState, setLinkState] = useState<string>(member.vdoNinjaLink);
  const [nameState, setNameState] = useState<string>(member.name);

  useEffect(() => {
    setLinkState(member.vdoNinjaLink);
    setNameState(member.name);
  }, [member.vdoNinjaLink, member.name]);

  const handleSave = () => {
    handleChange(index, linkState, nameState);
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
      <div className="mb-3">
        <Form.Label>VDO Ninja Link:</Form.Label>
        <Form.Control
          type="text"
          value={linkState}
          onChange={(e) => setLinkState(e.target.value)}
          placeholder="Enter VDO Ninja link"
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
