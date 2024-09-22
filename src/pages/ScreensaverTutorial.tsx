import {
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import DedoCopy from "../components/util/DedoCopy";
import DedoSwitch from "../components/util/DedoSwitch";
import { useState, useCallback, useRef } from "react";
import Screensaver from "../components/mapcover/Screensaver";

function ScreensaverTutorial() {
  document.body.className = "noOBS";
  const divRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState({
    border: false,
    speed: 3,
    size: 1,
    opacity: 1,
    imgSrc: "",
  });

  const updateSetting = useCallback((key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generateLink = () => {
    const baseUrl = "https://arceus-overlays.netlify.app/Screensaver";
    const params = new URLSearchParams(settings as any).toString();
    return `${baseUrl}?${params}`;
  };

  return (
    <Container className="mapcoverTut">
      <Row className="centerR w-100">
        <Col className="centerC w-50">
          <h1 className="blackOutline">Screensaver-Generator</h1>
          <Form className="mb-3 w-75 centerC blackOutline">
            <Form.Group className="mb-3">
              <Form.Label>Choose Screensaver URL of an image: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={settings.imgSrc}
                id="dedoKey"
                onChange={(e) => updateSetting("imgSrc", e.target.value)}
              />
            </Form.Group>

            <DedoSwitch
              label="Border"
              checked={settings.border}
              onChange={(checked) => updateSetting("border", checked)}
            />

            <Form.Group className="mb-3 w-50">
              <Form.Label className="rangeLabel">
                Screensaver-Speed: {settings.speed}
              </Form.Label>
              <input
                type="range"
                className="dedo-range"
                value={settings.speed}
                onChange={(e) =>
                  updateSetting("speed", parseFloat(e.target.value))
                }
                min={0}
                max={10}
                step={0.5}
              ></input>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
              <Form.Label className="rangeLabel">
                Screensaver-Size: {settings.size}
              </Form.Label>
              <input
                type="range"
                className="dedo-range"
                value={settings.size}
                onChange={(e) =>
                  updateSetting("size", parseFloat(e.target.value))
                }
                min={0.1}
                max={8}
                step={0.1}
              ></input>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
              <Form.Label className="rangeLabel">
                Screensaver-Opacity: {settings.opacity}
              </Form.Label>
              <input
                type="range"
                className="dedo-range"
                value={settings.opacity}
                onChange={(e) =>
                  updateSetting("opacity", parseFloat(e.target.value))
                }
                min={0}
                max={1}
                step={0.1}
              ></input>
            </Form.Group>
          </Form>
          <h3 className="blackOutline">Generated Screensaver Link</h3>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={generateLink()}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />

            <DedoCopy textToCopy={generateLink()} />
          </InputGroup>
          <Container id="help">
            <h4 className="blackOutline">What to do with the mapcover:</h4>
            <ListGroup numbered>
              <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
              <ListGroup.Item>
                Copy and paste the link in the URL field
              </ListGroup.Item>
              <ListGroup.Item>
                Set width and height to whatever you want. And you are ready to
                go!
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Container
          className="mapCover2 mapBorder centerC justify-content-center"
          ref={divRef}
        >
          {divRef.current && (
            <Screensaver
              logoSrc={settings.imgSrc}
              randomizeColor={true}
              speed={settings.speed}
              containerRect={divRef.current}
              calcSize={settings.size}
              border={settings.border}
              opacity={settings.opacity}
            />
          )}
        </Container>
      </Row>
    </Container>
  );
}

export default ScreensaverTutorial;
