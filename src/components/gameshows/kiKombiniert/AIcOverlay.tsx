import { AICombineWebsocket } from "../../../types/WebsocketTypes";
import { AICombGameState } from "../../../types/gameshows/AICombine";
import { preloadImages, useQuery } from "../../../types/UsefulFunctions";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { COMBINATIONS, STARTGAMESTATE } from "./AIcController";
import VDOLinkStream from "../../util/VDOLinkStream";

let ws: AICombineWebsocket;

function AIcOverlay() {
  const query = useQuery();
  const isTeams = query.get("teams") === "true";
  const [data, setData] = useState<AICombGameState>(STARTGAMESTATE);

  const addBuzzer = (_buzzer: string) => {};

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new AICombineWebsocket(id, setData, addBuzzer);
      preloadImages(
        COMBINATIONS.map((combination) => "../../AICombine/" + combination.left + ".png").concat(
          COMBINATIONS.map((combination) => "../../AICombine/" + combination.right + ".png").concat(
            COMBINATIONS.map((combination) => "../../AICombine/" + combination.combined + ".png")
          )
        )
      );
    }
  }, [query]);

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

  const links: string[] = [];
  data.teams.slice(1, data.teams.length).forEach((t) => {
    links.push(t.member[0].vdoNinjaLink);
    if (isTeams) {
      links.push(t.member[1].vdoNinjaLink);
    }
  });

  return (
    <Container className="AIcOverlayCon">
      <div className="AIcVDOStreams">
        {links.map((vdolink, index) => (
          <div key={index} className={streamsClass} id={streamIDs + index}>
            <VDOLinkStream link={vdolink} className={""} id={""} />
          </div>
        ))}
      </div>
      <div id="AIcStreamAdmin">
        <VDOLinkStream
          link={data.teams.filter((t) => t.admin)[0].member[0].vdoNinjaLink}
          className=""
          id=""
        />
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
