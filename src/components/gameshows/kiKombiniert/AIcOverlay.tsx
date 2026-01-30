import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { getVDONinjaLink, preloadImages, useQuery } from "../../../types/UsefulFunctions";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { COMBINATIONS, STARTGAMESTATE } from "./AIcController";
import VDOLinkStream from "../../util/VDOLinkStream";

let ws: GameshowWebsocket<AICombGameState>;

function AIcOverlay() {
  const query = useQuery();
  const isTeams = query.get("teams") === "true";
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);

  const id = query.get("id");

  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<AICombGameState>(id, setData, addBuzzer);
      preloadImages(
        COMBINATIONS.map((combination) => "../../AICombine/" + combination.left + ".png").concat(
          COMBINATIONS.map((combination) => "../../AICombine/" + combination.right + ".png").concat(
            COMBINATIONS.map((combination) => "../../AICombine/" + combination.combined + ".png")
          )
        )
      );
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, [query]);

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (buzzer.startsWith("CLEAR_")) {
        const toRemove = buzzer.split("_")[1];
        return prevQueue.filter((b) => b !== toRemove);
      } else if (!prevQueue.includes(buzzer)) {
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const imageLeft = data.combination.leftShown ? data.combination.left : "AIHidden";
  const imageRight = data.combination.rightShown ? data.combination.right : "AIHidden";

  const streamsClass = isTeams ? "AIcVDOLinkStreamTeams" : "AIcVDOLinkStream";
  const streamIDs = isTeams ? "AIcstreamTeams" : "AIcstream";
  const overlayImage = isTeams ? "Overlay_Teams.png" : "Overlay_Singleplayer.png";
  const pointsClass = isTeams ? "AIcTeamPointsOverlay" : "AIcPointsOverlay";
  const leftOffset = isTeams ? 303 : 157;
  const leftIncrement = isTeams ? 617 : 305;
  const overlayAlt = isTeams
    ? "AI Combine teams overlay frame"
    : "AI Combine singleplayer overlay frame";

  const links: { link: string; name: string }[] = [];
  data.teams.forEach((t) => {
    if (links.length !== 6) {
      links.push({
        link: getVDONinjaLink(id!, t.member[0].name, data.password),
        name: t.member[0].name,
      });
      if (isTeams) {
        links.push({
          link: getVDONinjaLink(id!, t.member[1].name, data.password),
          name: t.member[1].name,
        });
      }
    }
  });

  return (
    <Container className="AIcOverlayCon">
      <div className="AIcVDOStreams">
        {links.map((vdolink, index) => (
          <div key={index} className={streamsClass} id={streamIDs + index}>
            <VDOLinkStream link={vdolink.link} className={""} id={""} />
            <div
              className={"AIcBuzzeredDiv" + (buzzerQueue[0] === vdolink.name ? " AICbuzzered" : "")}
            />
          </div>
        ))}
      </div>
      <div id="AIcStreamAdmin">
        <VDOLinkStream link={getVDONinjaLink(id!, data.admin, data.password)} className="" id="" />
      </div>
      <div id="AIcLeft" className="AIcimgOverlayDiv">
        <img
          className="AIcimgOverlay"
          src={"../../AICombine/" + imageLeft + ".png"}
          alt="Combination1"
        />
      </div>
      <div id="AIcRight" className="AIcimgOverlayDiv">
        <img
          className="AIcimgOverlay"
          src={"../../AICombine/" + imageRight + ".png"}
          alt="Combination2"
        />
      </div>
      <div id="AIcCombined">
        <img src={"../../AICombine/" + data.combination.combined + ".png"} alt="Combination" />
      </div>

      <img src={"../../AICombine/" + overlayImage} alt={overlayAlt} className="AIcOverlayImage" />
      <div className="AIcVDOStreams">
        {data.teams.map((team, index) => (
          <div
            key={index}
            className={pointsClass + " blackOutline"}
            style={{ left: leftOffset + leftIncrement * index + "px" }}
          >
            {team.points}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AIcOverlay;
