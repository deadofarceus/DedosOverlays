import { Container, Row, Col } from "react-bootstrap";
import BossInfo from "./BossInfo";
import ControlPanel from "./ControlPanel";
import GraphBox from "./GraphBox";
import ChangeBoss from "./ChangeBoss";
import "../../styles/Deathcounter.css";
import { DEFAULTPLAYER, Player, Settings } from "../../types/DeathcounterTypes";
import { useEffect, useState } from "react";
import { useQuery } from "../../types/UsefulFunctions";
import { DeathCounterWebsocket, GLOBALADDRESS } from "../../types/WebsocketTypes";
import { createOracle } from "../../types/DedoicPrediction";
import { ModEvent } from "../../types/BackendEvents";

let ws: DeathCounterWebsocket;
const oracle = createOracle();

function DeathcounterMod() {
  document.body.className = "noOBS";
  const [player, setPlayer] = useState<Player>(DEFAULTPLAYER);
  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    if (!ws && id) {
      ws = new DeathCounterWebsocket(id, setPlayer, true);
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/deathcounter/player/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPlayer(data.data);
      } else {
        console.log("ERROR FETCHING PLAYER: ", res.statusText);

        const savedPlayer = localStorage.getItem(id + "EldenRingDeathcounter");
        console.log("SAVEDPLAYER", savedPlayer);

        if (savedPlayer) {
          const sPlayer = JSON.parse(savedPlayer) as Player;
          sPlayer.settings = new Settings(5, true, false, false);
          setPlayer(sPlayer);
        }
      }
    };

    fetchData();
  }, [id, query]);

  const prediction = oracle.createDedoicPrediction(player.bosses[player.currentBoss].deaths);
  player.prediction = prediction;

  const sendData = (playerEvent: Player) => {
    if (!id) {
      return;
    }
    const event = new ModEvent(id, "deathcounter", playerEvent);
    console.log(playerEvent);
    ws.sendEvent(event);
  };

  const handleBossChange = (index: number) => {
    player.currentBoss = index;
  };

  const handleSecondPhase = () => {
    const newBosses = [...player.bosses];
    const current = newBosses[player.currentBoss];
    const newCurrent = { ...current };
    newCurrent.secondPhase = !newCurrent.secondPhase;

    const adjustment = newCurrent.secondPhase ? 100 : -100;
    newCurrent.deaths = current.deaths.map((death) => death + adjustment);

    newBosses[player.currentBoss] = newCurrent;
    sendData({ ...player, bosses: newBosses });
  };

  const handleNewDeath = (percentage: number) => {
    const newBosses = [...player.bosses];
    const current = newBosses[player.currentBoss];
    const newCurrent = { ...current };

    if (percentage < 0) {
      newCurrent.deaths = current.deaths.slice(0, -1);
    } else {
      newCurrent.deaths = [...current.deaths, percentage];
    }

    newBosses[player.currentBoss] = newCurrent;
    sendData({ ...player, bosses: newBosses });
  };

  const handleSettingsChange = (attribute: string, value: any) => {
    const newSettings: Settings = {
      ...player.settings,
      [attribute]: value,
    };
    sendData({ ...player, settings: newSettings });
  };

  console.log(player);

  return (
    <Container className="DeathContainer w-100 centerC">
      <Row className="w-100">
        <ChangeBoss player={player} callback={handleBossChange} />
        <Col className="align-items-baseline" xs={9}>
          <Row className="w-75">
            <BossInfo player={player} />
            <ControlPanel
              player={player}
              callback={handleSecondPhase}
              changeDeath={handleNewDeath}
            />
          </Row>
          <Row className="mt-3 w-100">
            <GraphBox player={player} callback={handleSettingsChange} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DeathcounterMod;
