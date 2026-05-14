import { useState, useEffect } from "react";
import { useAudioSettings } from "../../../context/AudioSettingsContext";
import "../../../styles/gameshows/LastManStanding.css";
import { TESTGamestate } from "../../../types/gameshows/LastManStanding";
import { LMSGameState } from "../../../types/gameshows/LastManStanding";
import { useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket } from "../../../types/WebsocketTypes";
import LMSBoard from "./LMSBoard";
import { Form } from "react-bootstrap";

let ws: GameshowWebsocket<LMSGameState>;

function LMSTeilnehmer() {
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
      <LMSBoard gamestate={gamestate} sendState={sendState} />
      <div className="centerR lms-playerPointsTNDiv">
        {gamestate.players.map((player, index) => (
          <div
            key={index}
            className={
              "lsm-playerPointsTN " + (player.name === currentPlayer.name ? "lms-ichbindran" : "")
            }
          >
            <div>
              <div>{player.name.toUpperCase()}</div>
              <div>{player.points}</div>
            </div>
            <div>{player.lifes}</div>
          </div>
        ))}
      </div>
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

export default LMSTeilnehmer;
