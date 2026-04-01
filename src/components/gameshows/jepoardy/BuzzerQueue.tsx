import { Col } from "react-bootstrap";
import Buzzer from "../../util/Buzzer";
import "../../../styles/gameshows/Buzzer.css";

interface BuzzerQueueProps {
  buzzerQueue: string[];
  clearBuzzer: () => void;
}

function BuzzerQueue({ buzzerQueue, clearBuzzer }: BuzzerQueueProps) {
  console.log(buzzerQueue, clearBuzzer);

  return (
    <Col className="centerC buzzer-queue jp-buzzerQueue">
      <h1 className="buzzerQTitle blackOutline">BuzzerQueue</h1>
      <div className="buzzerQueueScroll">
        {buzzerQueue.map((buzzer, index) => (
          <div>
            <Buzzer key={index} queueSlot={index + 1} buzzer={buzzer} clear={() => {}} />
          </div>
        ))}
      </div>
    </Col>
  );
}

export default BuzzerQueue;
