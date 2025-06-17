import { Settings } from "../../../types/Pokemon";
import { Col, Container } from "react-bootstrap";
import DedoSwitch from "../../util/DedoSwitch";

interface SettingsControlProps {
  changeSettings: (settings: Settings) => void;
  settings: Settings;
}

function SettingsControl({ changeSettings, settings }: SettingsControlProps) {
  const handleChange = (attribute: string, value: any) => {
    const newSettings: Settings = {
      ...settings,
      [attribute]: value,
    };
    changeSettings(newSettings);
  };

  return (
    <Container>
      <Col className="centerC SLsettingsCOl">
        <h2>Settings</h2>
        <DedoSwitch
          label={settings.imgType === "png" ? "Use GIF Animations" : "Use static PNG"}
          checked={settings.imgType === "gif"}
          onChange={(checked) => handleChange("imgType", checked ? "gif" : "png")}
        />
        <DedoSwitch
          label="Show Pokeballs"
          checked={settings.showPokeballs}
          onChange={(checked) => handleChange("showPokeballs", checked)}
        />
        <DedoSwitch
          label="Show Nicknames"
          checked={settings.showNicknames}
          onChange={(checked) => handleChange("showNicknames", checked)}
        />
      </Col>
    </Container>
  );
}

export default SettingsControl;
