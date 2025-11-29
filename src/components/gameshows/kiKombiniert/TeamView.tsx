import { Button, Container } from "react-bootstrap";
import { Member, Team } from "../../../types/gameshows/AICombine";
import { useQuery } from "../../../types/UsefulFunctions";
import { useState } from "react";
import VDOLink from "./VDOLink";

interface TeamProps {
  team: Team;
  index: number;
  handleChange: (team: Team, index: number) => void;
}

function TeamView({ team, index, handleChange }: TeamProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const query = useQuery();
  const isTeams = query.get("teams") === "true";

  const members = isTeams ? team.member.map((m) => m.name).join(" & ") : team.member[0].name;

  const handleSettingsChange = (memberIndex: number, link: string, name: string) => {
    const cm: Member = { name: name, vdoNinjaLink: link };
    const newMember = [...team.member];
    newMember[memberIndex] = cm;

    handleChange({ ...team, member: newMember }, index);
    setIsSettingsOpen(false);
  };

  const handlePoints = (points: number) => {
    handleChange({ ...team, points: team.points + points }, index);
    setIsSettingsOpen(false);
  };

  return (
    <Container className="AIcTeamView centerR blackOutline">
      <div className="AIc-member">
        {members} {!team.admin ? ` {${team.points}}` : ""}
      </div>
      {!team.admin && (
        <>
          <Button onClick={() => handlePoints(1)} variant="success" className="AIcPointbutton">
            +1
          </Button>
          <Button onClick={() => handlePoints(-1)} variant="danger" className="AIcPointbutton">
            -1
          </Button>
        </>
      )}

      <Button onClick={() => setIsSettingsOpen(true)} variant="secondary" title="Settings">
        ⚙️
      </Button>
      {isSettingsOpen && (
        <>
          {isTeams && !team.admin ? (
            team.member.map((m, mIndex) => (
              <VDOLink key={mIndex} index={mIndex} member={m} handleChange={handleSettingsChange} />
            ))
          ) : (
            <VDOLink index={0} member={team.member[0]} handleChange={handleSettingsChange} />
          )}
        </>
      )}
    </Container>
  );
}

export default TeamView;
