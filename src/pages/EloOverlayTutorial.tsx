import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../types/UsefulFunctions";
import {
  Container,
  Form,
  Col,
  InputGroup,
  Button,
  ListGroup,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import "../styles/EloOverlayTutorial.css";

function EloOverlayTutorial() {
  document.body.className = "noOBS";
  const nav = useNavigate();
  const query = useQuery();
  const [summonerName, setSummonerName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [legacyMode, setLegacyMode] = useState<boolean>(false);
  const [queuetype, setQueuetype] = useState<string>("soloduo");

  useEffect(() => {
    const summonerNameQ = query.get("name");
    const tagQ = query.get("tag");
    const keyQ = query.get("key");
    if (summonerNameQ !== null && tagQ !== null && keyQ !== null) {
      // Redirect to error page if any of the parameters is missing
      nav(`/EloOverlay/soloduo?name=${summonerNameQ}&tag=${tagQ}&key=${keyQ}`);
    } else {
      setLink(
        `https://arceus-overlays.netlify.app/EloOverlay/${queuetype}?name=${summonerName}&tag=${tag}&key=${key}&legacy=${legacyMode}`
      );
    }
  }, [key, legacyMode, nav, query, queuetype, summonerName, tag]);
  return (
    <Container className="layout">
      <h1>Elo Overlay Creator</h1>
      <Form id="userInputs" className="centerC">
        <Col className="centerC">
          <Form.Label className="homeLabel">Summoner Name + Tag:</Form.Label>
          <InputGroup className="sumTag">
            <Form.Control
              type="text"
              placeholder="Enter your summoner name"
              id="summonerName"
              value={summonerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSummonerName(e.target.value)
              }
            />
            <InputGroup.Text>#</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="tag"
              id="tag"
              value={tag}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTag(e.target.value)
              }
            />
          </InputGroup>
          <Form.Group>
            <Form.Label>
              Key: (if you don't have a key visit <a href="/help">Help</a>)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Key"
              value={key}
              id="dedoKey"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKey(e.target.value)
              }
            />
          </Form.Group>
        </Col>
        <Row className="centerR noWrap">
          <Form.Group>
            <Form.Label>Queue Type:</Form.Label>
            <DropdownButton
              drop={"down"}
              variant="primary"
              title={queuetype === "soloduo" ? "Solo/Duo" : "FlexQ"}
              onSelect={(evt) => setQueuetype(evt!)}
            >
              <Dropdown.Item eventKey="soloduo">Solo/Duo</Dropdown.Item>
              <Dropdown.Item eventKey="flex">FlexQ</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <a href="/help">Legacy mode:</a>
            </Form.Label>
            <DropdownButton
              drop={"down"}
              variant="primary"
              title={legacyMode ? "Enabled" : "Disabled"}
              onSelect={(evt) => setLegacyMode(evt! === "true")}
            >
              <Dropdown.Item eventKey="true">Enabled</Dropdown.Item>
              <Dropdown.Item eventKey="false">Disabled</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
        </Row>
      </Form>
      <Col className="centerC">
        <h3>Generated Link:</h3>
        <InputGroup className="mb-3" id="linkCol">
          <Form.Control
            type="text"
            value={link}
            readOnly
            aria-describedby="basic-addon2"
            className="link"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          >
            Copy
          </Button>
        </InputGroup>
        <Container id="help">
          <h4>What to do with the Link:</h4>
          <ListGroup numbered>
            <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
            <ListGroup.Item>
              Copy and paste the link in the URL field
            </ListGroup.Item>
            <ListGroup.Item>
              Set width to 1200px and heigth to 720px an resize it the way you
              want
            </ListGroup.Item>
            <ListGroup.Item>
              After a short period of time your Elo is displayed
            </ListGroup.Item>
            <ListGroup.Item>
              If you got a <a href="/help">weak link</a> then you have to click
              the button on your (
              <a
                href={`/EloOverlay/${queuetype}?name=${summonerName}&tag=${tag}&key=${key}`}
              >
                link
              </a>
              ) in your browser after every game
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </Col>
    </Container>
  );
}

export default EloOverlayTutorial;
