import { Row } from "react-bootstrap";
import Champion from "./ChampionEO";
import { MatchhistoryD } from "../../types/LeagueTypes";

function Matchhistory({ entry }: MatchhistoryD) {
  //Animations

  return (
    <Row className="matchhistory" md="auto">
      {entry.lastMatches.map((match, index) => (
        <Champion
          key={match.id}
          mvp={match.mvp}
          index={index}
          championName={match.championName}
          win={match.win}
          length={entry.lastMatches.length}
        />
      ))}
    </Row>
  );
}

export default Matchhistory;
