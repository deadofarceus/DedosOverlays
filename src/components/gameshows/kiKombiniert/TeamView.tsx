import { Container, Row } from "react-bootstrap";
import { Team } from "../../../types/gameshows/AICombine";

interface TeamProps {
  team: Team;
}

function TeamView({ team }: TeamProps) {
  return (
    <Container className="AIcTeamView centerC blackOutline">
      <Row className="centerR w-100 h-100">
        <div className="member">{team.member[0] + " & " + team.member[1]}</div>
        <div className="AIcPoints">{team.points}</div>
      </Row>
    </Container>
  );
}

export default TeamView;
