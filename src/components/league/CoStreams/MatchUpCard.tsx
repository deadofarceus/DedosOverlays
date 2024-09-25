import { Matchup } from "../../../types/CoStreamTypes";

function MatchUpCard({ matchup }: { matchup: Matchup }) {
  const { team1, team2, format, standing } = matchup;
  return (
    <div className="match-card centerC">
      <div className="team-section">
        {team1 && (
          <img
            src={`../teamlogos/${team1}.png`}
            alt={team1}
            className="team-logo"
          />
        )}
        <span className="team-name">{team1}</span>
        <span className="score">{standing}</span>
        <span className="team-name">{team2}</span>
        {team2 && (
          <img
            src={`../teamlogos/${team2}.png`}
            alt={team2}
            className="team-logo"
          />
        )}
      </div>
      <div className="details-section centerC">
        <span className="format">{format}</span>
      </div>
    </div>
  );
}

export default MatchUpCard;
