interface VTuberModelProps {
  model: string;
  talking: boolean;
}

function VTuberModel({ model, talking }: VTuberModelProps) {
  const modelTalking = MODELS.get(model + "-talking");
  const modelStill = MODELS.get(model);

  return (
    <div className="container">
      {talking ? (
        <img id="animatedGif" src={modelTalking} alt="Animated GIF" />
      ) : (
        <img id="staticImage" src={modelStill} alt="Static Image" />
      )}
    </div>
  );
}

const MODELS = new Map<string, string>([
  ["philly", "https://i.imgur.com/AUhp3kW.png"],
  ["philly-talking", "https://i.imgur.com/3IocABy.gif"],
]);

export default VTuberModel;
