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
      admin: false,
      yourTurn: false,
      lifes: 3,
      invulnerable: true,
      answers: [true, false],
    },
    {
      index: 1,
      name: "Kutcher",
      yourTurn: true,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 2,
      name: "Thunny",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 3,
      name: "Obsess",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 4,
      name: "Tolkin",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      index: 5,
      name: "Broeki",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    // {
    //   index: 6,
    //   name: "Karni",
    //   yourTurn: false,
    //   admin: false,
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 7,
    //   name: "Autophil",
    //   yourTurn: false,
    //   admin: true,
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
    // {
    //   index: 8,
    //   name: "Faister",
    //   yourTurn: false,
    //   admin: false,
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

  const livingPlayers = data.players.filter((player) => player.lifes > 0 || player.admin);

  const dcCamMapping = DISCORDCALLMAPPINGS.get(data.players.length)!;

  console.log(livingPlayers.length, dcCamMapping);

  return (
    <div className="ddf-overlay-container">
      {livingPlayers.map((player, index) => {
        return (
          !player.admin && (
            <DDFCamOverlay key={index} player={player} dcCamMapping={dcCamMapping[index]} />
          )
        );
      })}
    </div>
  );
}

export default DDFOverlay;
