import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isOBSBrowser } from "./types/UsefulFunctions";

function ErrorPage() {
  const obs = isOBSBrowser();
  if (obs) {
    document.body.style.backgroundColor = "transparent";
  } else {
    document.body.style.backgroundColor = "black";
  }
  const nav = useNavigate();
  return (
    <div className="centerC vh-100 justify-content-center">
      <Row>
        <h1 className="ERROR">Sorry an error has occoured!</h1>
        <Button size="lg" onClick={() => nav("/")}>
          GO BACK YOU WENT TOO FAR
        </Button>
      </Row>
    </div>
  );
}

export default ErrorPage;
