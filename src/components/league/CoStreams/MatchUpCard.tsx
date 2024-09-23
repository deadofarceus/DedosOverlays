import { Matchup } from "../../../types/CoStreamTypes";

function MatchUpCard({ matchup }: { matchup: Matchup }) {
  const { team1, team2, logo1, logo2, format } = matchup;
  return (
    <div className="match-card centerC">
      <div className="team-section">
        <span className="team-name">{team1}</span>
        <span className="score">0 - 0</span>
        <span className="team-name">{team2}</span>
      </div>
      <div className="details-section centerC">
        <span className="format">{format}</span>
      </div>
    </div>
  );
}

export default MatchUpCard;
