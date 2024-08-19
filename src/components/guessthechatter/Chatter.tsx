import { Button, Container, Row } from "react-bootstrap";
import { ChatterD } from "../../types/GuessTheChatterTypes";

function ChatterComp({ chatter, onGuess }: ChatterD) {
  const start =
    chatter.name === "Start"
      ? "Guess To Start"
      : `Is ${chatter.name} a Subscriber?`;
  return (
    <Container className="chatter centerC w-100">
      {/* HIER BILD NOCH WENN LUST */}
      <h2>{start}</h2>
      <Row className="w-100" md={3}>
        <Button
          size="lg"
          variant="success"
          className="m-2 w-25 blackOutline"
          onClick={() => onGuess(true)}
        >
          Subscriber
        </Button>
        <Button
          size="lg"
          variant="danger"
          className="m-2 w-25 blackOutline"
          onClick={() => onGuess(false)}
        >
          Not a Subscriber
        </Button>
      </Row>
    </Container>
  );
}

export default ChatterComp;
