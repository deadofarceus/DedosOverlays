import { Row, Col, Container } from "react-bootstrap";
import { FAQS } from "../types/FAQS";
import "../styles/Help.css";

function Help() {
  document.body.className = "noOBS";
  return (
    <Container className="HelpContainer centerC w-75">
      <Row className="w-75 centerR">
        <Col>
          <div className="faq">
            <h2>
              {1}. {FAQS[0].question}
            </h2>
            <p className="answers">
              Yes, it is free to use. Check out the <a href="/EloOverlay">tutorial</a>. Although it
              is free, I appreciate any small donation:{" "}
              <a href="https://paypal.me/deadofarceus" aria-label="PayPal">
                <img
                  height="36"
                  width="36"
                  style={{ filter: "drop-shadow(2px 2px 1px #222)" }}
                  src="../paypal.png"
                  alt="PayPal logo"
                />
              </a>{" "}
              <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
                <img
                  height="36"
                  width="36"
                  style={{ filter: "drop-shadow(2px 2px 1px #222)" }}
                  src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/61e1116779fc0a9bd5bdbcc7_Frame%206.png"
                  alt="Ko-fi logo"
                />
              </a>{" "}
              You will need a key to use the overlay. You can get the key by logging in with Twitch
              in the Tutorial. If you have any problems, you can contact me on{" "}
              <a href="https://twitter.com/deadofarceus">Twitter</a> @deadofarceus or via Twitch
              whisper also @deadofarceus. Gerne auch auf Deutsch {":)"}
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
            <p className="answers">
              Just message me over <a href="https://twitter.com/deadofarceus">Twitter</a>{" "}
              @deadofarceus so we can talk about your ideas.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Help;
