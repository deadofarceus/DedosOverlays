import { Button, Container } from "react-bootstrap";
import { Team } from "../../../types/gameshows/AICombine";
import { useQuery } from "../../../types/UsefulFunctions";

interface TeamProps {
  team: Team;
  index: number;
  handlePoints: (points: number, index: number) => void;
}

function TeamView({ team, index, handlePoints }: TeamProps) {
  const query = useQuery();
  const isTeams = query.get("teams") === "true";

  const members = isTeams ? team.member.join(" & ") : team.member[0];

  return (
    <Container className="AIcTeamView centerR blackOutline">
      <div className="member">
        {members} {` {${team.points}}`}
      </div>
      <Button onClick={() => handlePoints(1, index)} variant="success" className="AIcPointbutton">
        +1
      </Button>
      <Button onClick={() => handlePoints(-1, index)} variant="danger" className="AIcPointbutton">
        -1
      </Button>
    </Container>
  );
}

export default TeamView;
