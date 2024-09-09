import { Container } from "react-bootstrap";
import { isOBSBrowser, useQuery } from "../types/UsefulFunctions";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Screensaver from "../components/mapcover/Screensaver";

function Mapcover() {
  const obs = isOBSBrowser();
  if (obs) {
    document.body.style.backgroundColor = "transparent";
    document.body.className = "";
  } else {
    document.body.className = "noOBS";
  }
  const [dummy, setDummy] = useState<boolean>(true);

  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setDummy(false);
  }, []);

  console.log(dummy);
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
  const lanes = query.get("showLanes") === "true";
  mapName += fog ? "Fog_" : "noFog_";
  mapName += lanes ? "Lanes" : "noLanes";
  mapName += ".png";

  const speed = query.get("speed") ? parseFloat(query.get("speed")!) : 1;
  const dvd = query.get("dvd") === "true";

  return (
    <Container className="mapCover">
      <img
        ref={imgRef}
        src={mapName}
        alt=""
        className="mapCoverImg"
        style={{ width: `${calcSize}%` }}
      />
      {imgRef.current && dvd && (
        <Screensaver
          logoSrc="../CHALLENGER.png"
          initialColor="white"
          randomizeColor={true}
          speed={speed}
          containerRect={imgRef.current}
          calcSize={calcSize}
        />
      )}
    </Container>
  );
}

export default Mapcover;
