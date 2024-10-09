import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Chatter } from "../types/GuessTheSubTypes";
import "../styles/GuessTheChatter.css";
import { BraveryService } from "../service/BraveryService";
import { ChatMessage } from "@twurple/chat";
import "../styles/ChatBravery.css";
import { ChatMessageComp } from "../components/twitch/ChatBravery/ChatMessageComp";

const CLIENTID = "2qu2j6vzku0fad8z9ee5lohdc0iwm1";
const dummyChatter = new Chatter(
  "",
  "Start",
  "",
  true,
  "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
);
let braveryService: BraveryService = new BraveryService("", "");

function GuessTheChatter() {
  document.body.className = "noOBS";

  const [token, setToken] = useState<string>("");
  const [currentChatter, setCurrentChatter] = useState<Chatter>(dummyChatter);
  const [broad, setBroad] = useState<string>("");
  const [participants, setParticipants] = useState<number>(0);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Zustand für Chatnachrichten
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=http://localhost:5173/ChatBravery&response_type=token&scope=moderator:read:chatters channel:read:subscriptions chat:read`;
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=https://arceus-overlays.netlify.app/ChatBravery&response_type=token&scope=moderator:read:chatters channel:read:subscriptions chat:read`;

  const connectToChat = () => {
    braveryService.connectToChat(
      (message: ChatMessage) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      },
      (partys: number) => setParticipants(partys)
    );
    setBroad(braveryService.broadcaster.name);
  };
  console.log(
    "YO WHAT IS HAPPENING???????????",
    broad,
    currentChatter.name,
    participants
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setToken(token);
        window.location.hash = "";
        braveryService = new BraveryService(CLIENTID, token);
        braveryService.getStreamer();
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
      <h2>{broad}</h2>
      <Row className="w-100">
        {!token ? (
          <Button size="lg" href={twitchAuthUrl} className="twitch-login-btn">
            Login with Twitch
          </Button>
        ) : (
          <>
            <Row className="centerR w-100">
              {broad && (
                <Col className="centerC">
                  <h3>Participants: {participants}</h3>
                  <h4>to join type "!chatbravery"</h4>
                  <button
                    className="m-2 w-25 chatterButton centerR"
                    onClick={() => {
                      setChatMessages([]);
                      setCurrentChatter(braveryService.getRandomChatter());
                    }}
                  >
                    Reroll Chatter
                  </button>
                </Col>
              )}

              {currentChatter.name !== "Start" && (
                <Col className="centerC w-50">
                  <h3>The chosen one: {currentChatter.name}</h3>
                  <div className="w-100 h-100 messageCon">
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
                  </div>
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
