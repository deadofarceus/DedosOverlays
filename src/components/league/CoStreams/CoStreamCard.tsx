import { Container } from "react-bootstrap";
import { CoStreamCardProps } from "../../../types/CoStreamTypes";
import MatchUpCard from "./MatchUpCard";

function CoStreamCard({ date, matchups }: CoStreamCardProps) {
  return (
    <Container className="co-stream-card-container centerC m-2">
      <h4>
        {date.toLocaleDateString("de-DE", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
        })}{" "}
        ab{" "}
        {date.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        Uhr
      </h4>
      {matchups.map((matchup, index) => (
        <MatchUpCard key={index} matchup={matchup} />
      ))}
    </Container>
  );
}

export default CoStreamCard;
