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
} from "react-bootstrap";
import "../styles/EloOverlayTutorial.css";

function EloOverlayTutorial() {
  const nav = useNavigate();
  const query = useQuery();
  const [summonerName, setSummonerName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    const summonerNameQ = query.get("name");
    const tagQ = query.get("tag");
    const keyQ = query.get("key");
    if (summonerNameQ !== null && tagQ !== null && keyQ !== null) {
      // Redirect to error page if any of the parameters is missing
      nav(`/EloOverlay/soloduo?name=${summonerNameQ}&tag=${tagQ}&key=${keyQ}`);
    } else {
      setLink(
        `https://arceus-overlays.netlify.app/EloOverlay/soloduo?name=${summonerName}&tag=${tag}&key=8Xag5o6x1Y7zLi0C`
      );
    }
  }, [nav, query, summonerName, tag]);
  return (
    <Container className="layout">
      <h1>Elo Overlay Creator</h1>
      <Form id="userInputs">
        <Form.Group>
          <Form.Label>Summoner Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter summoner name"
            value={summonerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSummonerName(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tag"
            value={tag}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTag(e.target.value)
            }
          />
        </Form.Group>
      </Form>
      <Col>
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
            <ListGroup.Item>Add aa Browser Source in OBS</ListGroup.Item>
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
          </ListGroup>
        </Container>
      </Col>
    </Container>
  );
}

export default EloOverlayTutorial;
