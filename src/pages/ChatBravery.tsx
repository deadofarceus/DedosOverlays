import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Chatter } from "../types/GuessTheSubTypes";
import "../styles/GuessTheChatter.css";
import { BraveryService } from "../service/BraveryService";
import { ChatMessage } from "@twurple/chat";
import "../styles/ChatBravery.css";
import { ChatMessageComp } from "../components/twitch/ChatBravery/ChatMessageComp";

const CLIENTID = "2qu2j6vzku0fad8z9ee5lohdc0iwm1";
let braveryService: BraveryService = new BraveryService("", "");

function GuessTheChatter() {
  document.body.className = "noOBS";

  const [token, setToken] = useState<string>("");
  const [chatters, setChatters] = useState<Chatter[]>([]);
  const [currentChatter, setCurrentChatter] = useState<Chatter>(
    new Chatter(
      "",
      "Start",
      "",
      true,
      "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
    )
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Zustand für Chatnachrichten
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=http://localhost:5173/ChatBravery&response_type=token&scope=moderator:read:chatters channel:read:subscriptions chat:read`;
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=https://arceus-overlays.netlify.app/ChatBravery&response_type=token&scope=moderator:read:chatters channel:read:subscriptions chat:read`;

  const fetchChatters = async () => {
    await braveryService.getStreamer();
    const fetchedChatters = await braveryService.getAllChatters();
    setChatters(fetchedChatters);
  };

  const getRandomChatter = () => {
    const rc = chatters[Math.floor(Math.random() * chatters.length)];
    if (rc.isSubscribed) {
      braveryService.chatter = rc;
      setCurrentChatter(rc);
    } else {
      if (chatters.filter((c) => c.isSubscribed).length === 0) {
        braveryService.chatter = rc;
        setCurrentChatter(rc);
      } else {
        getRandomChatter();
      }
    }
  };

  const connectToChat = () => {
    braveryService.connectToChat((message: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && chatters.length === 0) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setToken(token);
        window.location.hash = "";
        braveryService = new BraveryService(CLIENTID, token);
        fetchChatters();
        setTimeout(() => {
          connectToChat();
        }, 500);
      }
    }
  }, [token, currentChatter]);

  const scrollToBottom = () => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scrollen, wenn sich die Chatnachrichten ändern
  }, [chatMessages]);

  return (
    <Container className="CBContainer centerC blackOutline">
      <h1 className="headlineCB">Chat Bravery</h1>
      <h2>{braveryService.broadcaster.name}</h2>
      <Row className="w-100">
        {!token ? (
          <Button size="lg" href={twitchAuthUrl} className="twitch-login-btn">
            Login with Twitch
          </Button>
        ) : (
          <>
            <Row className="centerR w-100">
              {braveryService.broadcaster.name && (
                <button
                  className="m-2 w-25 chatterButton centerR"
                  onClick={() => {
                    setChatMessages([]);
                    getRandomChatter();
                  }}
                >
                  Reroll Chatter
                </button>
              )}

              {currentChatter.name !== "Start" && (
                <Col className="centerC w-50">
                  <h3>The chosen one: {currentChatter.name}</h3>
                  <Col className="messages">
                    {chatMessages.map((msg, index) => (
                      <ChatMessageComp
                        key={index}
                        message={msg}
                        chatter={currentChatter}
                      />
                    ))}
                    <div ref={chatMessagesEndRef} />{" "}
                    {/* Referenz für das Ende der Nachrichten */}
                  </Col>
                </Col>
              )}
              <div className="w-25">itembuild und runen Placeholder</div>
            </Row>
          </>
        )}
      </Row>
    </Container>
  );
}

export default GuessTheChatter;
