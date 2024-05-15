import { Row, Col, Container } from "react-bootstrap";
import { FAQS } from "../types/FAQS";
import "../styles/Help.css";

function Help() {
  document.body.className = "noOBS";
  return (
    <Container className="HelpContainer centerC w-75">
      <Row className="w-75 centerR m-5">
        <Col>
          <div className="faq">
            <h2>
              {1}. {FAQS[0].question}
            </h2>
            <p className="answers">
              Yes, the weak version is free to use. You can get the Elo Overlay
              by contacting me on{" "}
              <a href="https://twitter.com/deadofarceus">Twitter</a>{" "}
              @deadofarceus or via Twitch whisper also @deadofarceus.
            </p>
          </div>
          <div className="faq">
            <h2>
              {2}. {FAQS[1].question}
            </h2>
            <p className="answers">{FAQS[1].answer}</p>
          </div>
          <div className="faq">
            <h2>
              {3}. {FAQS[2].question}
            </h2>
            <p className="answers">{FAQS[2].answer}</p>
          </div>
          <div className="faq">
            <h2>
              {4}. {FAQS[3].question}
            </h2>
            <p className="answers">{FAQS[3].answer}</p>
          </div>
          <div className="faq">
            <h2>
              {5}. {FAQS[4].question}
            </h2>
            <p className="answers">
              Just message me over{" "}
              <a href="https://twitter.com/deadofarceus">Twitter</a>{" "}
              @deadofarceus so we can talk about your ideas.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Help;
