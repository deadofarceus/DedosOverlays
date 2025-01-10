import { Row } from "react-bootstrap";

interface Elo {
  rank: string;
  tier: string;
  lp: number;
}

export interface ClimberProps {
  elo: Elo;
  today: number;
  icon: string;
  matchhistory: boolean[];
  place: number;
  streamer: string;
}

function Climber({ elo, today, icon, matchhistory, place }: ClimberProps) {
  const placeColor =
    place === 1
      ? "#ffd90077"
      : place === 2
      ? "#c0c0c077"
      : place === 3
      ? "#a3593777"
      : "#00000034";
  const vorzeichen = today >= 0 ? "+" : "";
  const lpDisplay = elo.lp + " LP";
  const lptoday = "(" + vorzeichen + today + "LP)";
  const isApex =
    elo.tier === "MASTER" ||
    elo.tier === "GRANDMASTER" ||
    elo.tier === "CHALLENGER";

  return (
    <Row className="climber climber-container">
      {matchhistory.map((mh, index) => (
        <h1
          key={index}
          className={mh ? "wonGC blackOutline" : "loseGC blackOutline"}
        >
          I
        </h1>
      ))}
      <div className="GCiconDiv" style={{ backgroundColor: placeColor }}>
        <img src={icon} alt="" className="climber-image" />
      </div>
      <div className="GCeloDIV">
        <img src={"../" + elo.tier + ".png"} alt="" className="tier-image" />
        {!isApex && <p className="GCeloLP blackOutline">{elo.rank}</p>}
      </div>
      <h1 className="GClpDisplay blackOutline">{lpDisplay}</h1>
      <h1
        className="GClpDisplay blackOutline"
        style={{ color: today >= 0 ? "#6eff57" : "#FF6565" }}
      >
        {lptoday}
      </h1>
    </Row>
  );
}

export default Climber;
