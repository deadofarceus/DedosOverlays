import { PCPlayer } from "../../types/PCTurnierTypes";

function PlayerDisplay({ name, points, rank }: PCPlayer) {
  const numberColor =
    rank === 1
      ? "firstD"
      : rank === 2
      ? "secondD"
      : rank === 3
      ? "thirdD"
      : rank > 8
      ? "greyD"
      : "greenD";
  return (
    <div className="PCplayerStats w-100 d-flex justify-content-between align-items-center">
      <span className={"numberD " + numberColor}>{rank}</span>
      <span className={"playerNameD "}>{name}</span>
      <span className={"pointsD "}>{points}</span>
    </div>
  );
}

export function PlayerDisplayOther({ name, points, rank }: PCPlayer) {
  const numberColor =
    rank === 1
      ? "firstD"
      : rank === 2
      ? "secondD"
      : rank === 3
      ? "thirdD"
      : rank > 8
      ? "greyD"
      : "greenD";
  return (
    <div className="PCplayerStats w-75 d-flex justify-content-between align-items-center">
      <span className={"numberD " + numberColor}>{rank}</span>
      <span className={"playerNameD "}>{name}</span>
      <span className={"pointsD "}>{points}</span>
    </div>
  );
}

export default PlayerDisplay;
