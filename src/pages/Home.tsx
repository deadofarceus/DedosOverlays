import { Col, Container } from "react-bootstrap";
import "../styles/Home.css";
import { OVERLAYS } from "../types/Overlays";
import OverlayCard from "../components/Home/OverlayCard";

function Home() {
  document.body.className = "noOBS";

  return (
    <Container className="HomeContainer">
      <Col className="centerC">
        <h1 className="headlineHome blackOutline">My Overlays</h1>
        <div className="overlayCards">
          {OVERLAYS.map((overlay, index) => (
            <OverlayCard
              key={index}
              game={overlay.game}
              imageURL={overlay.imageURL}
              hoverImageURL={overlay.hoverImageURL}
              description={overlay.description}
              url={overlay.url}
            />
          ))}
        </div>
      </Col>
    </Container>
  );
}

export default Home;
