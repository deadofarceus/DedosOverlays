import { useEffect, useState } from "react";
import { TESTGamestate } from "../../../types/gameshows/LastManStanding";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";
import { GameshowWebsocket } from "../../../types/WebsocketTypes";
import { useQuery } from "../../../types/UsefulFunctions";
import LMSBoard from "./LMSBoard";
import LMSPlayerScoreboard from "./LMSPlayerScoreboard";
import { Form } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";
import BoardControls from "./BoardControls";
import UserControls from "./UserControls";
import "../../../styles/gameshows/LastManStanding.css";

let ws: GameshowWebsocket<LMSGameState>;

function LMSController() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<LMSGameState>(TESTGamestate);
  const { buzzerVolume, setBuzzerVolume } = useAudioSettings();

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

  const sendState = (newState: LMSGameState) => {
    ws.sendData(newState);
  };

  const currentPlayer = gamestate.players[gamestate.currentPlayer];

  return (
    <div className="lsm-controller">
      <div className="lsm-boardAndControls">
        <BoardControls gamestate={gamestate} sendState={sendState} />
        <LMSBoard gamestate={gamestate} sendState={sendState} />
      </div>

      <LMSPlayerScoreboard players={gamestate.players} currentPlayerName={currentPlayer.name} />
      <UserControls gamestate={gamestate} sendState={sendState} />
      <div className="buzzerSoundSlider">
        <span aria-label="Sound" title="Sound">
          🔊
        </span>
        <Form.Range
          min={0}
          max={100}
          step={1}
          value={buzzerVolume}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBuzzerVolume(Number(e.target.value))
          }
          aria-label="Buzzer Lautstärke"
        />
      </div>
    </div>
  );
}

export default LMSController;
