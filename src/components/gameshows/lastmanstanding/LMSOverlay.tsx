import { useState, useEffect } from "react";
import "../../../styles/gameshows/LastManStanding.css";
import { LMSGameState, TESTGamestate } from "../../../types/gameshows/LastManStanding";
import { getVDONinjaLink, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket } from "../../../types/WebsocketTypes";
import LMSBoard from "./LMSBoard";
import VDOLinkStream from "../../util/VDOLinkStream";

let ws: GameshowWebsocket<LMSGameState>;

function LMSOverlay() {
  const [gamestate, setGamestate] = useState<LMSGameState>(TESTGamestate);

  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<LMSGameState>(id, setGamestate, () => {});
    }

    // const fetchData = async () => {
    //   const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
    //   if (res.ok) {
    //     const data = await res.json();
    //     setGamestate(data.data);
    //   } else {
    //     console.log(res.statusText);
    //   }
    // };

    // fetchData();
  }, []);

  const links: { link: string; name: string }[] = [];
  gamestate.players.forEach((p) => {
    if (links.length !== 6) {
      links.push({
        link: getVDONinjaLink(id!, p.name, gamestate.password),
        name: p.name,
      });
    }
  });

  console.log(links);
  console.log(getVDONinjaLink(id!, gamestate.admin.name, gamestate.password));

  const currentPlayer = gamestate.players[gamestate.currentPlayer];

  return (
    <div className="jp-overlay">
      <LMSBoard gamestate={gamestate} sendState={() => {}} />
      <div className="jp-VDOStreams">
        {links.map((vdolink, index) => (
          <div key={index} className={"jp-VDOLinkStreamDiv"} id={""}>
            <VDOLinkStream link={vdolink.link} className={"jp-VDOLinkStream"} id={""} />
            <div
              className={
                "jp-BuzzeredDiv" + (currentPlayer.name === vdolink.name ? " jp-buzzered" : "")
              }
            />
          </div>
        ))}
      </div>
      <div className="jp-StreamAdmin">
        <VDOLinkStream
          link={getVDONinjaLink(id!, gamestate.admin.name, gamestate.password)}
          className=""
          id=""
        />
      </div>
      <img className="jp-boardCutout" src="../../jepoardy/board_cutout.png" alt="" />
      <div className="jp-playerPointsDiv">
        {gamestate.players.map((player, index) => (
          <div
            key={index}
            className={
              "jp-playerPoints " + (currentPlayer.name === player.name ? " jp-buzzered" : "")
            }
            id={""}
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LMSOverlay;
