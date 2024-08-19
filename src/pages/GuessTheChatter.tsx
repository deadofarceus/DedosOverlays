import { Button, Col, Container, Row } from "react-bootstrap";
import ChatterComp from "../components/guessthechatter/Chatter";
import { useEffect, useState } from "react";
import { Chatter } from "../types/GuessTheChatterTypes";
import "../styles/GuessTheChatter.css";
import { TwitchService } from "../service/TwitchService";

const CLIENTID = "3gq5s85aqjuuwm519j21m436o7pzyu";
let twitchService: TwitchService = new TwitchService("", "");

function GuessTheChatter() {
  document.body.className = "noOBS";

  const [token, setToken] = useState<string>("");
  const [chatters, setChatters] = useState<Chatter[]>([]);
  const [currentChatter, setCurrentChatter] = useState<Chatter>(
    new Chatter("", "Start", "", true)
  );
  const [score, setScore] = useState(0);

  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=http://localhost:5173/GuessTheChatter&response_type=token&scope=moderator:read:chatters channel:read:subscriptions`;

  const fetchChatters = async () => {
    await twitchService.getStreamer();
    const response = await twitchService.getAllChatters();
    if (response.data) {
      const chatterList: Chatter[] = [];
      for (const user of response.data) {
        const isSub = false;
        chatterList.push(new Chatter(user.user_id, user.user_name, "", isSub!));
      }
      setChatters(chatterList);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && chatters.length === 0) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setToken(token);
        window.location.hash = "";
        twitchService = new TwitchService(CLIENTID, token);
        fetchChatters();
      }
    }
  }, []);

  const setNextChatter = () => {
    const randomIndex = Math.floor(Math.random() * chatters.length);
    setCurrentChatter(chatters[randomIndex]);
  };

  const handleGuess = (isSub: boolean) => {
    if (currentChatter.isSubscribed === isSub) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
    setNextChatter();
  };

  return (
    <Container className="GTCContainer centerC blackOutline">
      <h1>Guess The Chatter</h1>
      <h2>{twitchService.broadcaster.name}</h2>
      <Row className="w-100">
        {!token ? (
          <Button size="lg" href={twitchAuthUrl} className="twitch-login-btn">
            Login with Twitch
          </Button>
        ) : (
          <>
            <Col className="centerC">
              <ChatterComp chatter={currentChatter} onGuess={handleGuess} />
              <h3>Score: {score}</h3>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default GuessTheChatter;
