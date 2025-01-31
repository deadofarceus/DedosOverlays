import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import "../../styles/oldOrUnused/FiveVFiveMod.css";
import { useEffect, useState } from "react";
import { FiveVFiveWebsocket } from "../../types/WebsocketTypes";
import { useQuery } from "../../types/UsefulFunctions";

const GAMES = [
  "League of Legends",
  "Dota2",
  "Smite",
  "Heroes of the Storm",
  "Counter Strike 2",
  "Valorant",
  "Overwatch",
  "Paladins",
];

let ws: FiveVFiveWebsocket;

function FiveVFiveMod() {
  document.body.className = "noOBS";
  const query = useQuery();
  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new FiveVFiveWebsocket(id, undefined);
    }
  }, [query]);

  return (
    <Container className="FiveVFiveContainer">
      <h1 className="ssoos">5V5 Challenge Control</h1>
      <Col className="allGames">
        {GAMES.map((game) => (
          <Game game={game} />
        ))}
      </Col>
    </Container>
  );
}

function Game({ game }: { game: string }) {
  const [playStatus, setPlayStatus] = useState<string>("Not played");
  const [gameFormat, setGameFormat] = useState<string>("Select Format");
  const [standing, setStanding] = useState<string>("0 : 0");
  const [points, setPoints] = useState<number>(1);

  const handleGameFormatChange = (eventKey: string | null) => {
    setGameFormat(eventKey!);
    ws.gameFormatChange(eventKey!);
  };

  const handleOptionChange = (eventKey: string | null) => {
    setPlayStatus(eventKey!);
    ws.gamePlayStatusChange(game, eventKey!, points);
  };

  const handleIncrement = () => {
    setPoints(points + 1);
  };

  const handleDecrement = () => {
    setPoints(points - 1);
  };

  return (
    <Col className="gameplayed">
      <h1 className="gamename">{game}</h1>
      <InputGroup className="gamePointsInput">
        <InputGroup.Text>{`Punkte:`}</InputGroup.Text>
        <Form.Control placeholder={points.toString()} readOnly />
        <Button variant="outline-secondary" onClick={handleIncrement}>
          +1
        </Button>
        <Button variant="outline-secondary" onClick={handleDecrement}>
          -1
        </Button>
      </InputGroup>
      <DropdownButton
        title={playStatus}
        drop={"down"}
        variant="primary"
        onSelect={handleOptionChange}
        className="chooseGame"
      >
        <Dropdown.Item eventKey="Not played">Not played</Dropdown.Item>
        <Dropdown.Item eventKey="Current Game">Current Game</Dropdown.Item>
        <Dropdown.Item eventKey="Team 1 Gewinnt">Team 1 Gewinnt</Dropdown.Item>
        <Dropdown.Item eventKey="Team 2 Gewinnt">Team 2 Gewinnt</Dropdown.Item>
      </DropdownButton>
      {playStatus === "Current Game" && (
        <DropdownButton
          drop={"down"}
          variant="secondary"
          title={gameFormat || "Select Format"}
          onSelect={handleGameFormatChange}
          className="chooseGame"
        >
          <Dropdown.Item eventKey="BestOf1">BestOf1</Dropdown.Item>
          <Dropdown.Item eventKey="BestOf3">BestOf3</Dropdown.Item>
          <Dropdown.Item eventKey="BestOf5">BestOf5</Dropdown.Item>
        </DropdownButton>
      )}
      {(gameFormat === "BestOf3" || gameFormat === "BestOf5") && (
        <Form>
          <Form.Group className="formstanding">
            <Form.Label>Standing</Form.Label>
            <Form.Control
              type="text"
              value={standing}
              className="gamestanding"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStanding(e.target.value);
                ws.sendStanding(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      )}
    </Col>
  );
}

export default FiveVFiveMod;
