import { Container } from "react-bootstrap";
import { Soullink, activeTrainers } from "../../../types/Pokemon";
import TeamP from "./TeamP";

interface TeamPreviewProps {
  soullink: Soullink;
}

function TeamPreview({ soullink }: TeamPreviewProps) {
  const trainers = activeTrainers(soullink.trainers, soullink.settings.participants);
  return (
    <Container className="teampreviewCon">
      {trainers.map((t) => (
        <TeamP key={t.name} team={t.team} routes={soullink.routes} settings={soullink.settings} />
      ))}
    </Container>
  );
}

export default TeamPreview;
