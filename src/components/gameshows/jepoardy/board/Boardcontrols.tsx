import { Button } from "react-bootstrap";
import { JepoardyGameProps } from "../../../../types/gameshows/Jepoardy";

function BoardControls({ gamestate, sendState }: JepoardyGameProps) {
  console.log(gamestate, sendState);

  return (
    <div className="jp-boardControls centerC">
      <div className="centerR"></div>
      <Button variant="danger">AKTION ZURÜCK</Button>
      <Button variant="warning">AKTION VORWÄRTS</Button>
      <Button variant="primary">Frage Aufdecken</Button>
      <Button variant="danger">Falsche Antwort</Button>{" "}
      {/** automatisch Punkte zum Player zuweisen */}
      <Button variant="success">Richtige Antwort</Button>{" "}
      {/** automatisch Punkte zum Player zuweisen */}
      <Button variant="danger">Wechsel zu Board 1 oder 2</Button>
      {/** FRAGE ÖFFNEN DURCH KLICKEN */}
    </div>
  );
}

export default BoardControls;
