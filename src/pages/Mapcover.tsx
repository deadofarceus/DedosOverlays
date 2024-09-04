import { Container } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import { useParams } from "react-router-dom";

function Mapcover() {
  const obs = isOBSBrowser();
  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }
  const { game } = useParams();
  const query = useQuery();

  let mapName = "../../mapcover_";
  switch (game) {
    case "lol":
      mapName += "lol_";
      break;
    default:
      break;
  }
  const fog = query.get("showFog") === "true";
  const size = query.get("size") ? parseInt(query.get("size")!) : 100;

  const calcSize = 0.5 * size + 50;
  console.log(calcSize);

  const lanes = query.get("showLanes") === "true";
  mapName += fog ? "Fog_" : "noFog_";
  mapName += lanes ? "Lanes" : "noLanes";
  mapName += ".png";

  return (
    <Container className="mapCover">
      <img
        src={mapName}
        alt=""
        className="mapCoverImg"
        style={{ width: `${calcSize}%` }}
      />
    </Container>
  );
}

export default Mapcover;
