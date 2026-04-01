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

  const handleSettingsChange = (memberIndex: number, name: string) => {
    const cm: Member = { name: name };
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
        {members} {` {${team.points}}`}
      </div>
      <>
        <Button onClick={() => handlePoints(1)} variant="success" className="AIcPointbutton">
          +1
        </Button>
        <Button onClick={() => handlePoints(-1)} variant="danger" className="AIcPointbutton">
          -1
        </Button>
      </>

      <Button onClick={() => setIsSettingsOpen(true)} variant="secondary" title="Settings">
        ⚙️
      </Button>
      {isSettingsOpen && (
        <>
          {isTeams ? (
            team.member.map((m, mIndex) => (
              <VDOLink
                key={mIndex}
                index={mIndex}
                name={m.name}
                handleChange={handleSettingsChange}
              />
            ))
          ) : (
            <VDOLink
              key={0}
              index={0}
              name={team.member[0].name}
              handleChange={handleSettingsChange}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default TeamView;
