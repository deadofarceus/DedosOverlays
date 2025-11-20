import Champion from "./ChampionEO";
import { MatchhistoryD } from "../../types/LeagueTypes";
import { useState, useRef, useEffect } from "react";

function Matchhistory({ entry }: MatchhistoryD) {
  const [matches, setMatches] = useState(entry.lastMatches);
  const previousEntry = useRef(entry);

  useEffect(() => {
    if (previousEntry.current !== entry) {
      const newMatches = [...entry.lastMatches];
      setMatches(newMatches);
      previousEntry.current = entry;
    }
  }, [entry]);

  return (
    <div className="matchhistory">
      {matches.map((match, index) => (
        <Champion
          key={match.id}
          mvp={match.mvp}
          index={index}
          championName={match.championName}
          win={match.win}
          length={matches.length}
          isNew={
            index === matches.length - 1 && match.id !== previousEntry.current?.lastMatches[0]?.id
          }
        />
      ))}
    </div>
  );
}

export default Matchhistory;
