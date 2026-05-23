import { Settings } from "../../../types/Pokemon";
import { Col, Container, ButtonGroup, Button } from "react-bootstrap";
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
        <h1>
          <u>Settings</u>
        </h1>
        <div className="mb-3 SLsettingsCOl-participants">
          <ButtonGroup>
            {([1, 2, 3] as const).map((count) => (
              <Button
                key={count}
                variant={settings.participants === count ? "primary" : "outline-primary"}
                onClick={() => handleChange("participants", count)}
              >
                {count}
              </Button>
            ))}
          </ButtonGroup>
          <div className="mb-2">Participants</div>
        </div>
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
        <DedoSwitch
          label="Show Background"
          checked={settings.showBackground}
          onChange={(checked) => handleChange("showBackground", checked)}
        />
      </Col>
    </Container>
  );
}

export default SettingsControl;
