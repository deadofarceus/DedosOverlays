import { Button, Container } from "react-bootstrap";
import "../../styles/Soullink.css";

const CLIENTID = "d8m29lejdzp24m8t4ahp7z7xxmlhe5";

function SoullinkLogin() {
  document.body.className = "noOBS";
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENTID}&redirect_uri=https://${window.location.host}/Pokemon/Soullink&response_type=token&scope=user%3Aread%3Aemail`;

  return (
    <Container className="SoullinkContainer SoullinkLoginContainer centerC">
      <h1>Soullink Login</h1>
      <Button variant="success" href={twitchAuthUrl}>
        CLICK TO LOGIN IF YOU'RE THE CHOSEN CHATTER
      </Button>
    </Container>
  );
}

export default SoullinkLogin;
