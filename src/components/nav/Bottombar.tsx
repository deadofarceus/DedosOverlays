import { Col, Container, Row } from "react-bootstrap";
import "../../styles/Footer.css";
import { isOBSBrowser } from "../../types/UsefulFunctions";
import { useLocation } from "react-router-dom";

function Bottombar() {
  const location = useLocation();
  if (isOBSBrowser() || location.pathname.indexOf("Stream") > -1) {
    return <></>;
  }

  return (
    <footer className="footer bottom-0 w-100 position-fixed">
      <Container className="centerR">
        <Row>
          <Col className="footer-bottom">
            &copy; {new Date().getFullYear()} Dedo Software. All rights reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Bottombar;
