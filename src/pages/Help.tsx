import { Row, Col, Container } from "react-bootstrap";
import { FAQS } from "../types/FAQS";
import "../styles/Help.css";

function Help() {
  document.body.className = "noOBS";
  return (
    <Container className="HelpContainer centerC w-75">
      <Row className=" w-75">
        <Col>
          {FAQS.map((faq, index) => (
            <div key={index} className="faq">
              <h2>
                {index + 1}. {faq.question}
              </h2>
              {index === 0 && (
                <p className="answers">
                  Yes, you can get the Elo Overlay just contact me over{" "}
                  <a href="https://discord.com/users/192672614823624704">
                    Discord
                  </a>{" "}
                  @deadofarceus or via Twitch whisper also @deadofarceus.
                </p>
              )}
              {index !== 0 && <p className="answers">{faq.answer}</p>}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Help;
