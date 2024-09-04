import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "../styles/MapCover.css";
import { useState } from "react";

function MapcoverTutorial() {
  document.body.className = "noOBS";
  const [fog, setFog] = useState<boolean>(false);
  const [lanes, setLanes] = useState<boolean>(false);
  const [size, setSize] = useState<number>(50);
  const [game, setGame] = useState<string>("lol");
  const overlayLink = `https://arceus-overlays.netlify.app/mapcover/${game}?showFog=${fog}&showLanes=${lanes}&size=${size}`;

  let mapName = "../../mapcover_";
  switch (game) {
    case "lol":
      mapName += "lol_";
      break;
    default:
      break;
  }

  const calcSize = 0.5 * size + 50;
  mapName += fog ? "Fog_" : "noFog_";
  mapName += lanes ? "Lanes" : "noLanes";
  mapName += ".png";

  return (
    <Container className="mapcoverTut">
      <h1 className="">Create your Mapcover</h1>
      <Row className="centerR w-100">
        <Col className="centerC w-50">
          <Form className="centerC">
            <Col className="centerC">
              <Form.Group className="m-2">
                <Form.Label className="blackOutline">
                  Choose your Game:
                </Form.Label>
                <DropdownButton
                  drop={"down"}
                  variant="primary"
                  title={
                    game === "lol" ? "League of Legends" : "Counter Strike"
                  }
                  onSelect={(evt) => setGame(evt!)}
                >
                  <Dropdown.Item eventKey="lol">
                    League of Legends
                  </Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Row className="w-100" md={4}>
                <Form.Group className="w-50">
                  <Form.Label>
                    {
                      "Choose your Minimap Scale (you can find it under Options -> Interface -> Minimap Scale):"
                    }
                  </Form.Label>
                  <h2>{size}</h2>
                  <div className="sliderLabelsMapcover">
                    {[0, 25, 50, 75, 100].map((value) => (
                      <span key={value}>{value}</span>
                    ))}
                  </div>
                  <Form.Range
                    max={100}
                    min={0}
                    step={1}
                    defaultValue={50}
                    className="gameSlider"
                    onChange={(event) => setSize(parseInt(event.target.value))}
                  />
                </Form.Group>
                <Form.Group className="w-25">
                  <Form.Label>Toggle Fog of War:</Form.Label>
                  <DropdownButton
                    drop={"down"}
                    variant="primary"
                    title={fog ? "Enabled" : "Disabled"}
                    onSelect={(evt) => setFog(evt! === "true")}
                  >
                    <Dropdown.Item eventKey="true">Enabled</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Disabled</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
                <Form.Group className="w-25">
                  <Form.Label>Toggle show Lanes:</Form.Label>
                  <DropdownButton
                    drop={"down"}
                    variant="primary"
                    title={lanes ? "Enabled" : "Disabled"}
                    onSelect={(evt) => setLanes(evt! === "true")}
                  >
                    <Dropdown.Item eventKey="true">Enabled</Dropdown.Item>
                    <Dropdown.Item eventKey="false">Disabled</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Row>
            </Col>
          </Form>
          <h3 className="blackOutline">Generated Mapcover Link</h3>
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
              onClick={() => {
                navigator.clipboard.writeText(overlayLink);
              }}
            >
              Copy
            </Button>
          </InputGroup>
          <Container id="help">
            <h4 className="blackOutline">What to do with the mapcover:</h4>
            <ListGroup numbered>
              <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
              <ListGroup.Item>
                Copy and paste the link in the URL field
              </ListGroup.Item>
              <ListGroup.Item>
                Set width to 1920px and heigth to 1080px. The Mapcover should
                already have the correct size.
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Container className="mapCover2 centerC justify-content-center">
          <img
            src={mapName}
            alt=""
            className="mapCoverImg"
            style={{ width: `${calcSize}%` }}
          />
        </Container>
      </Row>
    </Container>
  );
}

export default MapcoverTutorial;
