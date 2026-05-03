import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { JepoardyGame, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { useQuery, getVDONinjaLink } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import VDOLinkStream from "../../util/VDOLinkStream";
import JepoardyBoard from "./board/JepoardyBoard";

let ws: GameshowWebsocket<JepoardyGame>;

function JepoardyOverlay() {
  const [gamestate, setGamestate] = useState<JepoardyGame>({
    currentState: 0,
    states: [TESTGamestate],
  });
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);

  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGame>(id, setGamestate, addBuzzer);
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

  const currentGamestate = gamestate.states[gamestate.currentState];

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
  currentGamestate.players.forEach((p) => {
    if (links.length !== 6) {
      links.push({
        link: getVDONinjaLink(id!, p.name, currentGamestate.password),
        name: p.name,
      });
    }
  });

  console.log(links);
  console.log(getVDONinjaLink(id!, currentGamestate.admin.name, currentGamestate.password));

  const currentPlayer =
    buzzerQueue.length === 0
      ? currentGamestate.players[currentGamestate.currentPlayer]
      : currentGamestate.players.find((p) => p.name === buzzerQueue[0])!;

  return (
    <div className="jp-overlay">
      <JepoardyBoard
        gamestate={currentGamestate}
        sendState={() => {}}
        buzzerQueue={buzzerQueue}
        clearBuzzer={() => {}}
        clearOneBuzzer={() => {}}
      />
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
          link={getVDONinjaLink(id!, currentGamestate.admin.name, currentGamestate.password)}
          className=""
          id=""
        />
      </div>
      <img className="jp-boardCutout" src="../../jepoardy/board_cutout.png" alt="" />
      <div className="jp-playerPointsDiv">
        {currentGamestate.players.map((player, index) => (
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

export default JepoardyOverlay;
