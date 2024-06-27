import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "../styles/Deathcounter.css";
import { useState } from "react";

function Deathcounter() {
  document.body.className = "noOBS";
  const [id, setID] = useState<string>("");
  const overlayLink = `https://arceus-overlays.netlify.app/deathcounter/overlay?id=${id}`;
  const modLink = `https://arceus-overlays.netlify.app/deathcounter/mod?id=${id}`;

  return (
    <Container className="DeathCounterCon w-100 centerC">
      <h1 className="">Deathcounter Overlay</h1>
      <Row className="centerR w-100">
        <Col className="centerC w-50">
          <Form className="centerC">
            <Col className="centerC">
              <Form.Group>
                <Form.Label className="blackOutline">
                  Choose a random ID it can be anything:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your ID"
                  value={id}
                  id="dedoKey"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setID(e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Form>
          <h3 className="blackOutline">Generated Mod Link</h3>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={modLink}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              disabled={!id}
              onClick={() => {
                navigator.clipboard.writeText(modLink);
              }}
            >
              Copy
            </Button>
          </InputGroup>
          <h3 className="blackOutline">Generated Overlay Link</h3>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={overlayLink}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              disabled={!id}
              onClick={() => {
                navigator.clipboard.writeText(overlayLink);
              }}
            >
              Copy
            </Button>
          </InputGroup>
          <Container id="help">
            <h4 className="blackOutline">What to do with the overlay link:</h4>
            <ListGroup numbered>
              <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
              <ListGroup.Item>
                Copy and paste the link in the URL field
              </ListGroup.Item>
              <ListGroup.Item>
                Set width to 800px and heigth to 800px an resize it the way you
                want. Most of the time in souls games the top right corner is
                the way to go.
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Col className="centerC w-50">FRAGEN UND ERKLÄRUNG</Col>
      </Row>
    </Container>
  );
}

export default Deathcounter;
