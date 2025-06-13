import { Container } from "react-bootstrap";
import { Route, Trainer } from "../../../types/Pokemon";
import TeamP from "./TeamP";

interface TeamPreviewProps {
  trainers: Trainer[];
  routes: Route[];
}

function TeamPreview({ trainers, routes }: TeamPreviewProps) {
  return (
    <Container className="teampreviewCon">
      {trainers.map((t) => (
        <TeamP key={t.name} team={t.team} routes={routes} />
      ))}
    </Container>
  );
}

export default TeamPreview;
