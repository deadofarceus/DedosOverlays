import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import Screensaver from "../components/mapcover/Screensaver";
import { useQuery } from "../types/UsefulFunctions";
import "../styles/GlobalScreensaver.css";

function GlobalScreensaver() {
  document.body.className = "screensaverReady";
  const [dummy, setDummy] = useState<boolean>(true);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setDummy(false);
  }, []);

  console.log(dummy);

  const query = useQuery();
  const imgSrc = query.get("imgSrc") || "../CHALLENGERScreenSaver.png";
  const border = query.get("border") === "true" || false;
  const speed = parseInt(query.get("speed") || "6");
  const opacity = parseFloat(query.get("opacity") || "1");
  const calcSize = parseFloat(query.get("size") || "1");
  return (
    <Container className="globalScreensaver" ref={divRef}>
      {divRef.current && (
        <Screensaver
          logoSrc={imgSrc}
          randomizeColor={true}
          speed={speed}
          containerRect={divRef.current}
          calcSize={calcSize}
          border={border}
          opacity={opacity}
        />
      )}
    </Container>
  );
}

export default GlobalScreensaver;
