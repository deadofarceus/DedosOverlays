import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Pokemon,
  Route,
  Settings,
  Soullink,
  activeTrainers,
  createDefaultTrainers,
  DEFAULT_SOULLINK_SETTINGS,
  ensureTrainers,
  normalizeSettings,
} from "../../../types/Pokemon";
import { isOBSBrowser, useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import { useNavigate } from "react-router-dom";
import SoullinkTeamOverlay from "./SoullinkTeamOverlay";
import { ModEvent } from "../../../types/BackendEvents";
import SoullinkTeamHeader from "./SoullinkTeamHeader";
import TeamPreview from "./TeamPreview";
import MiniRoute from "./MiniRoute";
import SettingsMenu from "./SettingsMenu";
import RouteManager from "./RouteManager";
import "../../../styles/Soullink.css";

let ws: BroadcastWebsocket<Soullink>;

function SoullinkTeam() {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    const nav = useNavigate();
    nav("/Pokemon/Soullink/Team/Tutorial");
    return;
  }
  const obs = isOBSBrowser();
  if (obs) {
    return <SoullinkTeamOverlay />;
  } else {
    document.body.className = "noOBS";
  }
  const [soullink, setSoullink] = useState<Soullink>({
    id: id,
    routes: [],
    trainers: createDefaultTrainers(),
    settings: DEFAULT_SOULLINK_SETTINGS,
    runs: 0,
  });
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filterWord, setFilterWord] = useState<string>("");
  const trainers = activeTrainers(soullink.trainers, soullink.settings.participants);
  const participantCount = soullink.settings.participants;

  useEffect(() => {
    if (id && !ws) {
      ws = new BroadcastWebsocket<Soullink>(id, setSoullink);
    }

    const fetchPokemon = async () => {
      const response = await fetch("../../pokemon/pokemon_species_names.csv");
      const text = await response.text();

      const lines = text.split("\n").slice(1); // Skip header
      const nameMap: Record<string, { id: string; nameDE?: string; nameEN?: string }> = {};

      for (const line of lines) {
        const [id, langId, name] = line.split(",", 4).map((v) => v?.trim());

        if (!id || !langId || !name) continue;

        if (!nameMap[id]) nameMap[id] = { id };

        if (langId === "6") nameMap[id].nameDE = name;
        if (langId === "9") nameMap[id].nameEN = name;
      }

      const fullList = Object.values(nameMap)
        .filter((p) => p.nameEN && p.nameDE)
        .map((p) => new Pokemon(p.id, p.nameEN!, p.nameDE!, "", "", ""));

      setAllPokemons(fullList);
    };
    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/pokemon/soullink/${id}`);
      if (res.ok) {
        const data = await res.json();
        data.data.settings = normalizeSettings(data.data.settings);
        data.data.trainers = ensureTrainers(data.data.trainers);
        if (!data.data.runs) {
          data.data.runs = 0;
        }
        setSoullink(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchPokemon();
    fetchData();
  }, []);

  const sendData = (soullinkEvent: Soullink) => {
    if (!id) {
      return;
    }
    const event = new ModEvent(id, "soullink", soullinkEvent);
    console.log(soullinkEvent);
    ws.sendEvent(event);
  };

  // Handler: Pokemon ändern
  const handlePokemonChange = (index: number, newPkm: Pokemon) => {
    const newSL = { ...soullink };
    newSL.trainers.forEach((trainer) => {
      trainer.team = [];
    });
    newSL.routes.forEach((route) => {
      if (route.name === newPkm.routeName) {
        route.pokemon[index] = newPkm;
      }
      if (route.inTeam) {
        for (let i = 0; i < participantCount; i++) {
          const trainer = newSL.trainers[i];
          trainer.team.push(route.pokemon[i]);
        }
      }
    });

    sendData(newSL);
  };

  // Handler: Route aktiv/inaktiv
  const killTrainerAndLink = (routeName: string, trainerIndex: number) => {
    const newSL = { ...soullink };
    const trainer = newSL.trainers[trainerIndex];
    if (trainer) {
      trainer.deaths = (trainer.deaths ?? 0) + 1;
    }

    newSL.routes.forEach((route) => {
      if (route.name === routeName) {
        // "Whole link dies" -> always mark as disabled (never toggles back here).
        route.disabled = true;
      }
    });
    sendData(newSL);
  };

  // Handler: Route ins Team
  const toggleRouteInTeam = (routeName: string) => {
    const newSL = { ...soullink };
    newSL.routes.forEach((route) => {
      if (route.name === routeName) {
        for (let i = 0; i < participantCount; i++) {
          const trainer = newSL.trainers[i];
          if (route.inTeam) {
            trainer.team = trainer.team.filter((pkm) => pkm.routeName !== route.name);
          } else {
            if (trainer.team.length >= 6) {
              const shiftedRName = trainer.team.shift()!.routeName;
              newSL.routes.find((r) => r.name === shiftedRName)!.inTeam = false;
            }
            trainer.team.push(route.pokemon[i]);
          }
        }
        route.inTeam = !route.inTeam;
      }
    });
    sendData(newSL);
  };

  const handleTrainerNameChange = (index: number, newName: string) => {
    const newSL = { ...soullink };
    newSL.trainers[index].name = newName;
    sendData(newSL);
  };

  const addNewRoute = (route: Route) => {
    const newSL = { ...soullink };
    if (newSL.routes.find((r) => r.name === route.name)) {
      return;
    }
    newSL.routes.push(route);
    newSL.routes.sort((a: Route, b: Route) => a.name.localeCompare(b.name));
    sendData(newSL);
  };

  const deleteRoute = (route: Route) => {
    const newSL = { ...soullink };
    newSL.routes.forEach((r) => {
      if (r.name === route.name) {
        for (let i = 0; i < participantCount; i++) {
          const trainer = newSL.trainers[i];
          if (r.inTeam) {
            trainer.team = trainer.team.filter((pkm) => pkm.routeName !== r.name);
          }
        }
        r.inTeam = false;
      }
    });
    const rIndex = newSL.routes.indexOf(route);
    newSL.routes.splice(rIndex, 1);
    newSL.routes.sort((a: Route, b: Route) => a.name.localeCompare(b.name));
    sendData(newSL);
  };

  const fullReset = () => {
    const newSL = { ...soullink };
    newSL.routes = [];
    newSL.trainers.forEach((trainer) => {
      trainer.team = [];
    });
    newSL.runs++;
    sendData(newSL);
  };

  const changeSettings = (settings: Settings) => {
    const newSL = { ...soullink };
    const oldParticipants = newSL.settings.participants;
    newSL.settings = settings;
    if (settings.participants > oldParticipants) {
      newSL.routes.forEach((route) => {
        while (route.pokemon.length < settings.participants) {
          const index = route.pokemon.length;
          const trainer = newSL.trainers[index];
          route.pokemon.push(
            new Pokemon("1", "Bulbasaur", "Bisasam", "Bisasam", route.name, trainer.name),
          );
        }
      });
    }
    sendData(newSL);
  };

  const routesFiltered = soullink.routes.filter(
    (r) =>
      filterWord === "" ||
      r.name.toLowerCase().includes(filterWord) ||
      r.pokemon.some(
        (p) =>
          p.name.toLowerCase().includes(filterWord) ||
          p.nickName.toLowerCase().includes(filterWord) ||
          p.nameDE.toLowerCase().includes(filterWord),
      ),
  );

  return (
    <Container className="soulLinkContainer">
      <SoullinkTeamHeader
        state={soullink}
        initialTrainerNames={soullink.trainers.map((t) => t.name)}
        onTrainerNameChange={handleTrainerNameChange}
        settings={soullink.settings}
      />
      <SettingsMenu
        onReset={fullReset}
        setSettings={changeSettings}
        trainers={trainers}
        settings={soullink.settings}
      />
      <RouteManager onAddRoute={addNewRoute} setFilterWord={setFilterWord} trainers={trainers} />
      <TeamPreview soullink={soullink} />
      <div className="routeDiv">
        {routesFiltered.map((r: Route) => (
          <MiniRoute
            key={r.name}
            route={r}
            allPokemons={allPokemons}
            settings={soullink.settings}
            onPokemonChange={handlePokemonChange}
            onToggleTeam={toggleRouteInTeam}
            onKillTrainer={killTrainerAndLink}
            onDeleteRoute={deleteRoute}
          />
        ))}
      </div>
    </Container>
  );
}

export default SoullinkTeam;
