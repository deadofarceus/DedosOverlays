import { useEffect, useState } from "react";
import { PokemonEvent, PokemonInfos } from "../../types/Pokemon";
import { BroadcastWebsocket } from "../../types/WebsocketTypes";
import { useQuery } from "../../types/UsefulFunctions";

let ws: BroadcastWebsocket<PokemonEvent>;
const pokemonInfos: PokemonInfos = {
  userName: "Niemand",
};

function SoullinkOverlay() {
  const [pseudo, setPokemonInfos] = useState<PokemonEvent>({
    type: "vdo",
    data: {},
    token: "",
  });

  if (pseudo.userName) {
    pokemonInfos.userName = pseudo.userName;
  }

  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    if (id && !ws) {
      ws = new BroadcastWebsocket<PokemonEvent>(id, setPokemonInfos);
    }
  }, []);

  return (
    <div className="soulllink-overlay">
      <h1>{pokemonInfos.userName}</h1>
    </div>
  );
}

export default SoullinkOverlay;
