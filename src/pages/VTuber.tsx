import { Container } from "react-bootstrap";
import "../styles/VTuber.css";
import VTuberModel from "../components/stream/VTuberModel";
import { useQuery } from "../types/UsefulFunctions";
import { useEffect, useState } from "react";

function VTuber() {
  const query = useQuery();
  const model = query.get("model");
  if (!model || !query.get("volumeThreshold")) {
    return <div>Invalid URL</div>;
  }
  const volumeThreshold: number = parseInt(query.get("volumeThreshold")!);

  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.fftSize = 256;

        microphone.connect(analyser);

        const checkAudio = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setIsTalking(volume > volumeThreshold);
          requestAnimationFrame(checkAudio);
        };

        checkAudio();
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  }, []);

  return (
    <Container>
      <VTuberModel model={model} talking={isTalking} />
    </Container>
  );
}
export default VTuber;
