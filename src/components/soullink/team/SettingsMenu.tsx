import { Button, Container } from "react-bootstrap";
import { Settings, Trainer } from "../../../types/Pokemon";
import SettingsControl from "./SettingsControl";

interface NewRouteInputProps {
  onReset: () => void;
  setSettings: (setings: Settings) => void;
  trainers: Trainer[];
  settings: Settings;
}

function SettingsMenu({ onReset, setSettings, settings }: NewRouteInputProps) {
  const handleReset = () => {
    if (confirm("Are you sure you want a full reset of the nuzlock?")) {
      onReset();
    }
  };

  return (
    <Container className="new-route-input">
      <div className="soullinkInstructions">
        <h3>Special Instructions</h3>
        <p>1. Click on a created Route to change the catched Pokémon</p>
        <p>2. Click on the player-names and change them, press Enter and they are saved</p>
        <p>3. Click on the pokemon-names and change them, press Enter and they are saved</p>
      </div>
      <SettingsControl changeSettings={setSettings} settings={settings} />
      <Button variant="danger" onClick={handleReset} className="nuzlockResetButton">
        FULL RESET
      </Button>
    </Container>
  );
}

export default SettingsMenu;
