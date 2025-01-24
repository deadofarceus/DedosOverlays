import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../types/UsefulFunctions";
import {
  Container,
  Form,
  Col,
  InputGroup,
  ListGroup,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import "../styles/EloOverlayTutorial.css";
import DedoCopy from "../components/util/DedoCopy";

function EloOverlayTutorial() {
  document.body.className = "noOBS";
  const nav = useNavigate();
  const query = useQuery();
  const [summonerName, setSummonerName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [lang, setLang] = useState<string>("de");
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
        `https://arceus-overlays.netlify.app/EloOverlay/${queuetype}?name=${summonerName}&tag=${tag}&key=${key}&legacy=${legacyMode}&lang=${lang}`
      );
    }
  }, [key, legacyMode, nav, query, queuetype, summonerName, tag, lang]);

  const preview = legacyMode
    ? "../EloOverlay/LegacyELO.png"
    : "../EloOverlay/StandardELO.png";

  return (
    <Container className="layout">
      <h1 className="blackOutline">Elo Overlay Creator</h1>
      <Row className="w-100">
        <div className="centerC w-50">
          <Form id="userInputs" className="centerC">
            <Col className="centerC">
              <Form.Label className="homeLabel blackOutline">
                Summoner Name + Tag:
              </Form.Label>
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
                <Form.Label className="blackOutline">
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
                <Form.Label className="blackOutline">Queue Type:</Form.Label>
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
              <Form.Group>
                <Form.Label>Language:</Form.Label>
                <DropdownButton
                  drop={"down"}
                  variant="primary"
                  title={lang === "en" ? "English" : "Deutsch"}
                  onSelect={(evt) => setLang(evt!)}
                >
                  <Dropdown.Item eventKey="de">Deutsch</Dropdown.Item>
                  <Dropdown.Item eventKey="en">English</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Row>
          </Form>
          <Col className="centerC">
            <h3 className="blackOutline">Generated Link:</h3>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                value={"..." + link.substring(link.indexOf(".app") + 4)}
                readOnly
                aria-describedby="basic-addon2"
                className="link"
              />

              {summonerName !== "" && tag !== "" && key !== "" && (
                <DedoCopy textToCopy={link} />
              )}
            </InputGroup>
            <Container id="help">
              <h4 className="blackOutline">What to do with the Link:</h4>
              <ListGroup numbered>
                <ListGroup.Item>Add a Browser Source in OBS</ListGroup.Item>
                <ListGroup.Item>
                  Copy and paste the link in the URL field
                </ListGroup.Item>
                <ListGroup.Item>
                  Set width to 1200px and heigth to 720px an resize it the way
                  you want
                </ListGroup.Item>
                <ListGroup.Item>
                  After a short period of time your Elo is displayed
                </ListGroup.Item>
                <ListGroup.Item>
                  If you want to support me you can do it here:{" "}
                  <a href="https://paypal.me/deadofarceus" aria-label="PayPal">
                    <img
                      height="36"
                      width="36"
                      style={{ filter: "drop-shadow(2px 2px 1px #222)" }}
                      src="../paypal.png"
                    />
                  </a>{" "}
                  <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
                    <img
                      height="36"
                      width="36"
                      style={{ filter: "drop-shadow(2px 2px 1px #222)" }}
                      src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/61e1116779fc0a9bd5bdbcc7_Frame%206.png"
                    />
                  </a>{" "}
                </ListGroup.Item>
              </ListGroup>
            </Container>
          </Col>
        </div>
        <img src={preview} alt="" className="previewELO" />
      </Row>
    </Container>
  );
}

export default EloOverlayTutorial;
