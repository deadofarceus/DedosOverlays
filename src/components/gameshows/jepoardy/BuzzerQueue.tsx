import { Button, Col } from "react-bootstrap";
import Buzzer from "../../util/Buzzer";
import "../../../styles/gameshows/Buzzer.css";

interface BuzzerQueueProps {
  buzzerQueue: string[];
  clearBuzzer: () => void;
  clearOneBuzzer: (buzzer: string) => void;
}

function BuzzerQueue({ buzzerQueue, clearBuzzer, clearOneBuzzer }: BuzzerQueueProps) {
  const admin = window.location.href.includes("admin");

  return (
    <Col className="centerC buzzer-queue jp-buzzerQueue">
      <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
      <div className="jp-buzzerQueueScroll">
        {buzzerQueue.map((buzzer, index) => (
          <div className="jp-buzzer">
            <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} clear={clearOneBuzzer} />
          </div>
        ))}
        {admin && (
          <Button variant="danger" className="jp-clearBuzzer" onClick={() => clearBuzzer()}>
            Clear Buzzer
          </Button>
        )}
      </div>
    </Col>
  );
}

export default BuzzerQueue;
