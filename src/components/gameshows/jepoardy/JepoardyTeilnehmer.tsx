import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { ModEvent } from "../../../types/BackendEvents";
import { JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket } from "../../../types/WebsocketTypes";
import JepoardyBoard from "./board/JepoardyBoard";
import { Button, Form } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";

let ws: GameshowWebsocket<JepoardyGameState>;
const audio = new Audio("../../sounds/Buzzer.mp3");

function JepoardyTeilnehmer() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<JepoardyGameState>(TESTGamestate);
  const [noYouClicked, setNoYouClicked] = useState<boolean>(false);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const { buzzerVolume, setBuzzerVolume } = useAudioSettings();

  const query = useQuery();
  const id = query.get("id");
  const player = gamestate.players.find((p) => p.name === query.get("name"));
  if (!player || !id) {
    return <></>;
  }

  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGameState>(id, setGamestate, addBuzzer);
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

  useEffect(() => {
    audio.volume = Math.min(1, Math.max(0, buzzerVolume / 100));
  }, [buzzerVolume]);

  const sendState = (newState: JepoardyGameState) => {
    const event = new ModEvent(id, "persistantdata", newState);
    console.log(newState);
    ws.sendEvent(event);
  };

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (!prevQueue.includes(buzzer)) {
        if (prevQueue.length === 0) {
          audio.play();
        }
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const currentPlayer =
    buzzerQueue.length === 0
      ? gamestate.players[gamestate.currentPlayer]
      : gamestate.players.find((p) => p.name === buzzerQueue[0])!;

  const playerName = player.name;

  const question = gamestate.currentQuestion;
  const buzzerShowing = gamestate.state === "QUESTION" && !question.finished;

  const buzzerPressable =
    !question.buzzedPlayers.map((p) => p.name).includes(playerName) &&
    question.buzzedPlayers.length > 0 &&
    buzzerQueue.length === 0 &&
    question.state === "ACTIVE";

  const canUseYoinkJoker =
    currentPlayer.name !== playerName &&
    player.yoinkJoker &&
    question.buzzedPlayers.length === 0 &&
    buzzerQueue.length === 0 &&
    gamestate.state === "QUESTION";
  const canUseNoYouJoker =
    gamestate.players[gamestate.currentPlayer].name === playerName &&
    player.noYouJoker &&
    question.buzzedPlayers.length === 0 &&
    buzzerQueue.length === 0 &&
    gamestate.state === "QUESTION";
  const canUseGamemasterJoker =
    currentPlayer.name !== playerName && player.gmJoker === 1 && gamestate.state === "BOARD";

  const handleYoinkJoker = () => {
    if (!canUseYoinkJoker) return;
    const id = query.get("id")!;
    const newGamestate = { ...gamestate };
    newGamestate.players.forEach((p) => {
      if (p.name === playerName) {
        p.yoinkJoker = false;
      }
    });
    sendState(newGamestate);
    buzzer(id, playerName);
  };

  const handleNoYouJoker = () => {
    if (!canUseNoYouJoker) return;
    setNoYouClicked(!noYouClicked);
  };

  const handleGamemasterJoker = () => {
    if (!canUseGamemasterJoker) return;
    const newGamestate = { ...gamestate };
    newGamestate.players.forEach((p) => {
      if (p.name === playerName) {
        p.gmJoker = 0;
      }
    });

    sendState(newGamestate);
  };

  const handleBuzzer = () => {
    if (!buzzerShowing) {
      return;
    }

    if (!buzzerPressable) {
      return;
    }

    const id = query.get("id")!;
    buzzer(id, playerName);
  };

  const handleNameNoYou = (name: string) => {
    if (!noYouClicked) return;
    if (name === playerName) {
      return;
    }
    setNoYouClicked(false);
    const newGamestate = { ...gamestate };
    newGamestate.players.forEach((p) => {
      if (p.name === playerName) {
        p.noYouJoker = false;
      }
    });
    sendState(newGamestate);
    buzzer(id, name);
  };

  return (
    <div className="jp-controller">
      <div style={{ height: "30px" }}></div>
      <JepoardyBoard
        gamestate={gamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={() => {}}
        clearOneBuzzer={() => {}}
      />
      {/* <BuzzerQueue
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      /> */}

      <h1 className="jp-ownPlayerName blackOutline">{playerName}</h1>

      <div className="centerR jp-playerPointsTNDiv">
        {gamestate.players.map((player, index) => (
          <div
            key={index}
            onClick={() => handleNameNoYou(player.name)}
            className={
              "jp-playerPointsTN " +
              (player.name === currentPlayer.name ? "jp-ichbindran" : "") +
              (noYouClicked ? " jp-playerPointsTN-noYouSelect" : "")
            }
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>

      <div className="jp-joker-div centerC">
        <div className="jp-joker-grid">
          <button
            type="button"
            className="jp-joker-card jp-joker-yoink"
            onClick={handleYoinkJoker}
            disabled={!canUseYoinkJoker}
            aria-disabled={!canUseYoinkJoker}
          >
            <div className="jp-joker-row">
              <img className="jp-joker-icon" src="../../../jepoardy/Icon_Yoink.png" alt="" />
              <div className="jp-joker-title">YOINK</div>
            </div>
            <div className="jp-joker-subtitle">KLAUE DIE FRAGE EINES MITSPIELERS</div>
          </button>

          <button
            type="button"
            className="jp-joker-card jp-joker-noyou"
            onClick={handleNoYouJoker}
            disabled={!canUseNoYouJoker}
            aria-disabled={!canUseNoYouJoker}
          >
            <div className="jp-joker-row">
              <img className="jp-joker-icon" src="../../../jepoardy/Icon_NoYou.png" alt="" />

              <div className="jp-joker-title">NO YOU</div>
            </div>
            <div className="jp-joker-subtitle">EINE FRAGE WIRD WEITERGEGEBEN</div>
          </button>

          <button
            type="button"
            className="jp-joker-card jp-joker-gamemaster"
            onClick={handleGamemasterJoker}
            disabled={!canUseGamemasterJoker}
            aria-disabled={!canUseGamemasterJoker}
          >
            <div className="jp-joker-row">
              <img className="jp-joker-icon" src="../../../jepoardy/Icon_Gamemaster.png" alt="" />
              <div className="jp-joker-title">GAMEMASTER</div>
            </div>
            <div className="jp-joker-subtitle">WÄHLE DIE FRAGE FÜR EINEN MITSPIELER AUS</div>
          </button>
        </div>
      </div>

      {buzzerShowing && (
        <div className="centerC" style={{ width: "70%" }}>
          <Button
            variant="danger"
            className={
              "buzzerButton blackOutline " + (buzzerPressable ? "" : "buzzerButtonDisabled")
            }
            onClick={handleBuzzer}
          >
            BUZZER
          </Button>
        </div>
      )}

      <div className="buzzerSoundSlider">
        {/** das auch bei controller ALLE SOUNDS mit der selben Lautstärke */}
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

export default JepoardyTeilnehmer;
