import {
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "../styles/MapCover.css";
import { useCallback, useRef, useState } from "react";
import Screensaver from "../components/mapcover/Screensaver";
import DedoSwitch from "../components/util/DedoSwitch";
import DedoCopy from "../components/util/DedoCopy";

function MapcoverTutorial() {
  document.body.className = "noOBS";
  const imgRef = useRef<HTMLImageElement>(null);
  const [settings, setSettings] = useState({
    showFog: true,
    showLanes: true,
    size: 50,
    dvd: false,
    speed: 1,
  });

  const updateSetting = useCallback((key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generateLink = useCallback(() => {
    const baseUrl = "https://arceus-overlays.netlify.app/mapcover/lol";
    const params = new URLSearchParams(settings as any).toString();
    return `${baseUrl}?${params}`;
  }, [settings]);

  let mapName = "../../mapcover_lol_";

  const calcSize = 0.5 * settings.size + 50;
  mapName += settings.showFog ? "Fog_" : "noFog_";
  mapName += settings.showLanes ? "Lanes" : "noLanes";
  mapName += ".png";

  return (
    <Container className="mapcoverTut">
      <Row className="centerR w-100">
        <Col className="centerC w-50">
          <h1 className="blackOutline">Mapcover-Generator</h1>
          <Form className="mb-3 w-75 centerC blackOutline">
            <Form.Group className="mb-3">
              <Form.Label>Minimap-Skala: {settings.size}</Form.Label>
              <input
                type="range"
                className="dedo-range"
                min={0}
                max={100}
                value={settings.size}
                onChange={(e) =>
                  updateSetting("size", parseInt(e.target.value))
                }
              ></input>
            </Form.Group>

            <DedoSwitch
              label="Show Fog of War"
              checked={settings.showFog}
              onChange={(checked) => updateSetting("showFog", checked)}
            />

            <DedoSwitch
              label="Show Lanes"
              checked={settings.showLanes}
              onChange={(checked) => updateSetting("showLanes", checked)}
            />

            <DedoSwitch
              label="Show Screensaver"
              checked={settings.dvd}
              onChange={(checked) => updateSetting("dvd", checked)}
            />

            <Form.Group className="mb-3">
              <Form.Label>Screensaver-Speed: {settings.speed}</Form.Label>
              <input
                type="range"
                className="dedo-range"
                value={settings.speed}
                onChange={(e) =>
                  updateSetting("speed", parseFloat(e.target.value))
                }
                min={0}
                max={2}
                step={0.1}
              ></input>
            </Form.Group>
          </Form>
          <h3 className="blackOutline">Generated Mapcover Link</h3>
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
                Set width to 1920px and heigth to 1080px. The Mapcover should
                already have the correct size.
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Container className="mapCover2 centerC justify-content-center">
          <img
            ref={imgRef}
            src={mapName}
            alt=""
            id="mapcover"
            className="mapCoverImg mapBorder"
            style={{ width: `${calcSize}%` }}
          />
          {imgRef.current && settings.dvd && (
            <Screensaver
              logoSrc="../CHALLENGERScreenSaver.png"
              initialColor="white"
              randomizeColor={true}
              speed={settings.speed}
              containerRect={imgRef.current}
              calcSize={calcSize * 0.01}
            />
          )}
        </Container>
      </Row>
    </Container>
  );
}

export default MapcoverTutorial;
