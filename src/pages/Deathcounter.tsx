import { Col, Container, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import "../styles/Deathcounter.css";
import { useState } from "react";
import DedoCopy from "../components/util/DedoCopy";

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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)}
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
            <DedoCopy textToCopy={modLink} />
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
            <DedoCopy textToCopy={overlayLink} />
          </InputGroup>
          <Container id="help">
            <h4 className="blackOutline">What to do with the overlay link:</h4>
            <ListGroup numbered>
              <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
              <ListGroup.Item>Copy and paste the link in the URL field</ListGroup.Item>
              <ListGroup.Item>
                Set width to 800px and heigth to 800px an resize it the way you want. Most of the
                time in souls games the top right corner is the way to go.
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Col className="centerC w-50">
          <Col>
            <div className="faq">
              <h4 className="blackOutline">How does it work?</h4>
              <p className="">
                There is a mod- and overlaylink. The deaths and percentages has to be observed and
                noted manually by a person with the modlink. Then the deaths are displayed in the
                overlay.
              </p>
            </div>
            <div className="faq">
              <h4 className="blackOutline">How can i reset it?</h4>
              <p className="">
                If you want to reset it/play a new game. Then you can simply change the ID to a new
                one. Your old progress is saved in your browser data.
              </p>
            </div>
            <div className="faq">
              <h4 className="blackOutline">Is it free to use?</h4>
              <p className="">
                YES! But if you want to support my work you can check out my{" "}
                {
                  <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
                    Ko-fi
                  </a>
                }
                {". "}
                {
                  <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
                    <img
                      height="36"
                      src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                      alt="Ko-fi logo"
                    />
                  </a>
                }
              </p>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Deathcounter;
