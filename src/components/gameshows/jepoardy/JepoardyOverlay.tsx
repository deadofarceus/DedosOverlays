import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { useQuery, getVDONinjaLink } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import VDOLinkStream from "../../util/VDOLinkStream";
import JepoardyBoard from "./board/JepoardyBoard";

let ws: GameshowWebsocket<JepoardyGameState>;

function JepoardyOverlay() {
  const [gamestate, setGamestate] = useState<JepoardyGameState>(TESTGamestate);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);

  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGameState>(id, setGamestate, addBuzzer);
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
      if (res.ok) {
        const data = await res.json();
        setGamestate(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, []);

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (!prevQueue.includes(buzzer)) {
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const links: { link: string; name: string }[] = [];
  gamestate.players.forEach((p) => {
    if (links.length !== 6) {
      links.push({
        link: getVDONinjaLink(id!, p.name, gamestate.password),
        name: p.name,
      });
    }
  });

  return (
    <div className="jp-overlay">
      <JepoardyBoard gamestate={gamestate} sendState={setGamestate} />
      <div className="jp-VDOStreams">
        {links.map((vdolink, index) => (
          <div key={index} className={"jp-VDOLinkStreamDiv"} id={""}>
            <VDOLinkStream link={vdolink.link} className={"jp-VDOLinkStream"} id={""} />
            <div
              className={"jp-BuzzeredDiv" + (buzzerQueue[0] === vdolink.name ? " jp-buzzered" : "")}
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
          <div key={index} className={"jp-playerPoints"} id={""}>
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JepoardyOverlay;
