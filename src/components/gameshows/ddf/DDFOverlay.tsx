import { useState, useEffect } from "react";
import { DDFliegtGameState } from "../../../types/gameshows/DDFliegt";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import { DISCORDCALLMAPPINGS } from "../../../types/gameshows/DiscordConstants";
import DDFCamOverlay from "./DDFCamOverlay";

let ws: BroadcastWebsocket<DDFliegtGameState>;

export const STARTGAMESTATE: DDFliegtGameState = {
  players: [
    {
      index: 0,
      name: "Kroko",
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 1,
      name: "Kutcher",
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 2,
      name: "Thunny",
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 3,
      name: "Obsess",
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    // {
    //   index: 4,
    //   name: "Tolkin",
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 5,
    //   name: "Broeki",
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 6,
    //   name: "Karni",
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 7,
    //   name: "Autophil",
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 8,
    //   name: "Faister",
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
  ],
};

function DDFOverlay() {
  const query = useQuery();
  const [data, setData] = useState<DDFliegtGameState>(STARTGAMESTATE);

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new BroadcastWebsocket<DDFliegtGameState>(id, setData);
    }
  }, [query]);

  const dcCamMapping = DISCORDCALLMAPPINGS.get(data.players.length)!;

  console.log(data.players.length, dcCamMapping);

  return (
    <div className="ddf-overlay-container">
      {data.players.map((player, index) => (
        <DDFCamOverlay key={index} player={player} dcCamMapping={dcCamMapping[index]} />
      ))}
    </div>
  );
}

export default DDFOverlay;
