import { useState, useEffect } from "react";
import { DDFliegtGameState } from "../../../types/gameshows/DDFliegt";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import { DISCORDCALLMAPPINGS } from "../../../types/gameshows/DiscordConstants";
import DDFCamOverlay from "./DDFCamOverlay";
import { STARTGAMESTATE } from "./DDFController";

let ws: BroadcastWebsocket<DDFliegtGameState>;

function DDFOverlay() {
  const query = useQuery();
  const [data, setData] = useState<DDFliegtGameState>(STARTGAMESTATE);

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new BroadcastWebsocket<DDFliegtGameState>(id, setData);
    }
  }, [query]);

  const livingPlayers = data.players.filter((player) => player.lifes > 0 || player.admin);

  const dcCamMapping = DISCORDCALLMAPPINGS.get(livingPlayers.length)!;
  const finale = livingPlayers.filter((player) => player.lifes > 0 && !player.admin).length === 2;
  const phil = !(query.get("noBackground") === "true");

  return (
    <div
      style={{ marginTop: dcCamMapping.marginTop }}
      className={"ddf-overlay-container" + (phil ? " ddf-overlay-container-image" : "")}
    >
      {livingPlayers.map((player, index) => (
        <DDFCamOverlay
          key={index}
          finale={finale}
          showTurn={data.showTurn}
          player={player}
          dcCamMapping={dcCamMapping}
        />
      ))}
    </div>
  );
}

export default DDFOverlay;
