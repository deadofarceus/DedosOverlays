import { useState } from "react";
import { Container, Row, Col, InputGroup, ListGroup, Form } from "react-bootstrap";
import DedoCopy from "../../util/DedoCopy";

function SoullinkTutorial() {
  document.body.className = "noOBS";
  const [id, setID] = useState<string>("");
  const link = `https://arceus-overlays.netlify.app/Pokemon/Soullink/Team?id=${id}`;

  return (
    <Container className="DeathCounterCon w-100 centerC">
      <h1 className="">SoulLink Overlay</h1>
      <Row className="centerR w-100">
        <Col className="centerC w-50">
          <h4 className="blackOutline">What can it do?</h4>
          <p>
            Everything you need to track your SoulLink (Nuzlocke) challenge: save linked Pokémon
            caught per route, mark dead links, and display two teams of 6 Pokémon.
          </p>
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
          <h3 className="blackOutline">Generated Overlay Link</h3>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={"..." + link.substring(link.indexOf(".app") + 4)}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />

            <DedoCopy textToCopy={link} />
          </InputGroup>
          <Container id="help">
            <h4 className="blackOutline">What to do with the overlay link:</h4>
            <ListGroup numbered>
              <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
              <ListGroup.Item>Copy and paste the link in the URL field</ListGroup.Item>
              <ListGroup.Item>
                Set width to 1280px and heigth to 720px an resize it the way you want.
              </ListGroup.Item>
              <ListGroup.Item>
                You can spimply add it twice to your OBS to add the second row of Pokemon to a
                different spot
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Col className="centerC w-50">
          <Col>
            <div className="faq">
              <h4 className="blackOutline">How does it work?</h4>
              <p className="">
                Simply enter any ID you like and dont leak it. The Link you get is the same link you
                open to control the overlay and the overlay itself. In OBS it will transform to the
                overlay on your browser you can control it.
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

export default SoullinkTutorial;
