import { Button } from "react-bootstrap";

interface BuzzerProps {
  buzzer: string;
  queueSlot: number;
  clear: (buzzer: string) => void;
}

function Buzzer({ buzzer, queueSlot, clear }: BuzzerProps) {
  const url = new URL(window.location.href);
  const urlContainsAdmin = url.pathname.toLowerCase().indexOf("admin") > -1;

  return (
    <div className="AIcBuzzer blackOutline">
      {queueSlot + ". " + buzzer}{" "}
      {urlContainsAdmin && (
        <Button variant="danger" onClick={() => clear(buzzer)}>
          X
        </Button>
      )}
    </div>
  );
}

export default Buzzer;
