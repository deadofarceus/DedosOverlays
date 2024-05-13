import { Container, Nav, Navbar } from "react-bootstrap";
import { isOBSBrowser } from "../../types/UsefulFunctions";

function DedoNavbar() {
  if (isOBSBrowser()) {
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
