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
          <Nav.Link href="/help">Help</Nav.Link>
          <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
            <img
              height="36"
              src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
            />
          </a>
          {/* <Nav.Link href="/about">About</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DedoNavbar;
