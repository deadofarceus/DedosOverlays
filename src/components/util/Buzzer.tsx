interface BuzzerProps {
  buzzer: string;
  queueSlot: number;
}

function Buzzer({ buzzer, queueSlot }: BuzzerProps) {
  return <div className="AIcBuzzer blackOutline">{queueSlot + ". " + buzzer}</div>;
}

export default Buzzer;
