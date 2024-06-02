import { Container, Nav, Navbar } from "react-bootstrap";
import { isOBSBrowser } from "../../types/UsefulFunctions";
import { useLocation } from "react-router-dom";

function DedoNavbar() {
  const location = useLocation();
  if (isOBSBrowser() || location.pathname.indexOf("Stream") > -1) {
    return <></>;
  }

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary fixed-top"
    >
      <Container>
        <Navbar.Brand href="/">Dedos Overlays</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/EloOverlay">Elo Overlay</Nav.Link>
          <Nav.Link href="/help">Help</Nav.Link>
          {/* <Nav.Link href="/about">Help</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DedoNavbar;
