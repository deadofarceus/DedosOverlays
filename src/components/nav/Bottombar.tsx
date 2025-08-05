import { Col, Container, Row } from "react-bootstrap";
import "../../styles/Footer.css";
import { isOBSBrowser, useQuery } from "../../types/UsefulFunctions";
import { useLocation } from "react-router-dom";

function Bottombar() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const query = useQuery();
  const obsQ = query.get("obs");

  if (
    isOBSBrowser() ||
    pathname.indexOf("stream") > -1 ||
    pathname.indexOf("gameshows") > -1 ||
    obsQ === "true"
  ) {
    return <></>;
  }

  const isRiotGamesRelated =
    pathname.indexOf("elooverlay") > -1 ||
    pathname.indexOf("abisz") > -1 ||
    pathname.indexOf("chatbravery") > -1 ||
    pathname.indexOf("mapcover") > -1;

  return (
    <footer className="footer bottom-0 w-100 position-fixed">
      <Container className="centerR">
        <Row className="w-75">
          <Col className="footer-bottom">
            Copyright &copy; {new Date().getFullYear()} Dedos Software. All rights reserved{" "}
            <a href="/imprint"> Impressum</a>
            <br />
            This website does not collect, store, or process any personal data. No cookies are used.
            {isRiotGamesRelated && (
              <div>
                <p>
                  This Overlay is not endorsed by Riot Games and does not reflect the views or
                  opinions of Riot Games or anyone officially involved in producing or managing
                  League of Legends. League of Legends and Riot Games are trademarks or registered
                  trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Bottombar;
