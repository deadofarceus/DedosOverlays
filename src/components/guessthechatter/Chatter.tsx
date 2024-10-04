import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { ChatterD } from "../../types/GuessTheSubTypes";

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const chatMessages = [
  "Im a Subscriber",
  // "LUL das war lustig",
  // "GG wp allen",
  // "Kann mir jemand erklären, was gerade passiert ist?",
  // "Pog",
  // "Ich liebe diesen Stream!",
  // "OMEGALUL",
  // "Kappa",
  // "monkaS",
  // "PogChamp",
  // Fügen Sie hier weitere Nachrichten hinzu
];

let color = "white";

function ChatterComp({ chatter, onGuess }: ChatterD) {
  const [isSubHovered, setIsSubHovered] = useState(false);
  const [isNotSubHovered, setIsNotSubHovered] = useState(false);

  const start =
    chatter.name === "Start" ? "Guess To Start" : `Is this user a subscriber?`;
  return (
    <Container className="chatter centerC w-100">
      <h2>{start}</h2>
      <div className="twitch-chat-message centerR">
        <img className="sub-icon" src={chatter.subIcon} />
        <span className="chatter-name" style={{ color: color }}>
          {chatter.name}:
        </span>
        <span className="message-text">
          {chatMessages[Math.floor(Math.random() * chatMessages.length)]}
        </span>
        <img
          src="https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/dark/2.0"
          alt=""
        />
      </div>
      <Row className="w-100" md={3}>
        <button
          className="m-2 w-25 guessButton centerR"
          onClick={() => {
            color = getRandomColor();
            onGuess(true);
          }}
          onMouseEnter={() => setIsSubHovered(true)}
          onMouseLeave={() => setIsSubHovered(false)}
        >
          <img src={isSubHovered ? "../Sub.webp" : "../Sub.png"} alt="" />
          SUB
        </button>
        <button
          className="m-2 w-25 guessButton centerR guessNO"
          onClick={() => {
            color = getRandomColor();
            onGuess(false);
          }}
          onMouseEnter={() => setIsNotSubHovered(true)}
          onMouseLeave={() => setIsNotSubHovered(false)}
        >
          <img src={isNotSubHovered ? "../Pleb.webp" : "../Pleb.png"} alt="" />
          PLEB
        </button>
      </Row>
    </Container>
  );
}

export default ChatterComp;
