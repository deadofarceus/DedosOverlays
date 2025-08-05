import { Container, Nav, Navbar } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../../types/UsefulFunctions";
import { useLocation } from "react-router-dom";

function DedoNavbar() {
  const location = useLocation();
  const query = useQuery();
  const obsQ = query.get("obs");
  const pathname = location.pathname.toLowerCase();
  if (
    isOBSBrowser() ||
    pathname.indexOf("stream") > -1 ||
    pathname.indexOf("gameshows") > -1 ||
    obsQ === "true"
  ) {
    return <></>;
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="/">Dedos Overlays</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/help">Help</Nav.Link>
          <a href="https://ko-fi.com/Q5Q5ZTNQB" target="_blank">
            <img height="36" src="https://storage.ko-fi.com/cdn/kofi1.png?v=3" />
          </a>
          {/* <Nav.Link href="/about">About</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DedoNavbar;
