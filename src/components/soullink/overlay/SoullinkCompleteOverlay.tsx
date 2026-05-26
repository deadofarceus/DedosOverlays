import { useState, useEffect } from "react";
import {
  Soullink,
  createDefaultTrainers,
  DEFAULT_SOULLINK_SETTINGS,
  activeTrainers,
  normalizeSettings,
  ensureTrainers,
} from "../../../types/Pokemon";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import Team from "../team/Team";
import "../../../styles/Soullink.css";

let ws: BroadcastWebsocket<Soullink>;

function SoullinkCompleteOverlay() {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  const [soullink, setSoullink] = useState<Soullink>({
    id: id,
    routes: [],
    trainers: createDefaultTrainers(),
    settings: DEFAULT_SOULLINK_SETTINGS,
    runs: 0,
  });
  const routes = soullink.routes;
  const trainers = activeTrainers(soullink.trainers, soullink.settings.participants);
  useEffect(() => {
    if (id && !ws) {
      ws = new BroadcastWebsocket<Soullink>(id, setSoullink);
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/pokemon/soullink/${id}`);
      if (res.ok) {
        const data = await res.json();
        data.data.settings = normalizeSettings(data.data.settings);
        data.data.trainers = ensureTrainers(data.data.trainers);
        setSoullink(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, []);

  let runs = soullink.runs;
  if (
    id ===
    "asdfiufiafasaoufashofaposdashofhahifsaoifhoiasoifoiafoihaohihioaihosahiofahoiasoihahiosf"
  ) {
    runs += 39;
  }

  return (
    <div className="sco-container">
      <div className="sco-runs blackOutline">{"Run:" + runs}</div>
      <>
        {trainers.map((t, index) => (
          <div className={`sco-trainer${index + 1}`}>
            <Team
              key={t.name}
              index={index}
              team={t.team}
              routes={routes}
              settings={soullink.settings}
            />
          </div>
        ))}
      </>
      <>
        {trainers.map((t, index) => (
          <div className={`sco-deaths${index + 1} sco-death blackOutline`}>
            <div>{t.deaths}</div>
            <img className="sco-death-img" src="../../../pokemon/deathssoullink.png" alt="" />
          </div>
        ))}
      </>
    </div>
  );
}

export default SoullinkCompleteOverlay;
