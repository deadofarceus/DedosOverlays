import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../types/UsefulFunctions";

function EloOverlayTutorial() {
  const nav = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const summonerName = query.get("name");
    const tag = query.get("tag");
    const key = query.get("key");
    if (summonerName !== null && tag !== null && key !== null) {
      // Redirect to error page if any of the parameters is missing
      nav(`/EloOverlay/soloduo?name=${summonerName}&tag=${tag}&key=${key}`);
    } else {
      /* empty */
    }
  }, [nav, query]);
  return <h1> Depracted </h1>;
}

export default EloOverlayTutorial;
