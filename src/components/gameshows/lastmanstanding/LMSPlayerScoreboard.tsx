import { LMSPlayer } from "../../../types/gameshows/LastManStanding";

const HEART_SRC = "../../DDF/heart.png";

function LMSPlayerHearts({ count }: { count: number }) {
  if (count <= 0) {
    return <div className="lms-scoreboardHearts lms-scoreboardHearts--empty" aria-label="Keine Leben" />;
  }

  return (
    <div className="lms-scoreboardHearts" aria-label={`${count} Leben`}>
      {Array.from({ length: count }, (_, i) => (
        <img key={i} className="lms-scoreboardHeart" src={HEART_SRC} alt="" />
      ))}
    </div>
  );
}

interface LMSPlayerScoreboardProps {
  players: LMSPlayer[];
  currentPlayerName: string;
}

function LMSPlayerScoreboard({ players, currentPlayerName }: LMSPlayerScoreboardProps) {
  return (
    <div className="centerR lms-scoreboard">
      {players.map((player, index) => (
        <div
          key={index}
          className={[
            "lms-scoreboardCard",
            player.name === currentPlayerName && "lms-scoreboardCard--active",
            player.lifes === 0 && "lms-scoreboardCard--out",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="lms-scoreboardInfo">
            <span className="lms-scoreboardName">{player.name.toUpperCase()}</span>
            <span className="lms-scoreboardPoints">{player.points}</span>
          </div>
          <LMSPlayerHearts count={player.lifes} />
        </div>
      ))}
    </div>
  );
}

export default LMSPlayerScoreboard;
