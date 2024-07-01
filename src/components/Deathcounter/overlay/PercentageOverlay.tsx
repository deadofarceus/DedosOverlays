import { Container, Row } from "react-bootstrap";

function PercentageOverlay() {
  return (
    <Container className="hpOverlay centerC">
      <Row className="signRow">
        {[
          "",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "Λ",
          "|",
          "",
        ].map((sign, index) => (
          <span className="sign" key={index}>
            {sign}
          </span>
        ))}
      </Row>
      <Row className="labelRow">
        {["10%", "50%", "90%"].map((sign, index) => (
          <span className="sign" key={index}>
            {sign}
          </span>
        ))}
      </Row>
    </Container>
  );
}

export default PercentageOverlay;
