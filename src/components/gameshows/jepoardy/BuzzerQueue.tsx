interface BuzzerQueueProps {
  buzzerQueue: string[];
  clearBuzzer: () => void;
}

function BuzzerQueue({ buzzerQueue, clearBuzzer }: BuzzerQueueProps) {
  console.log(buzzerQueue, clearBuzzer);

  return <></>;
}

export default BuzzerQueue;
