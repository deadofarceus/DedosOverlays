import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { JepoardyGame, JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket } from "../../../types/WebsocketTypes";
import JepoardyBoard from "./board/JepoardyBoard";
import { Button, Form } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";

let ws: GameshowWebsocket<JepoardyGame>;
const audio = new Audio("../../sounds/Buzzer.mp3");

function JepoardyTeilnehmer() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<JepoardyGame>({
    currentState: 0,
    states: [TESTGamestate],
  });
  const [noYouClicked, setNoYouClicked] = useState<boolean>(false);
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const { buzzerVolume, setBuzzerVolume } = useAudioSettings();

  const query = useQuery();
  const id = query.get("id");
  const currentGamestate = gamestate.states[gamestate.currentState];
  const player = currentGamestate.players.find((p) => p.name === query.get("name"));
  if (!player || !id) {
    return <></>;
  }

  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGame>(id, setGamestate, addBuzzer);
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
    const newGame = { ...gamestate };
    // newGame.states[newGame.currentState + 1] = newState;
    // newGame.currentState++;
    newGame.states[0] = newState;
    ws.sendData(newGame);
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
      ? currentGamestate.players[currentGamestate.currentPlayer]
      : currentGamestate.players.find((p) => p.name === buzzerQueue[0])!;

  const playerName = player.name;

  const question = currentGamestate.currentQuestion;
  const buzzerShowing = currentGamestate.state === "QUESTION" && !question.finished;

  const buzzerPressable =
    !question.buzzedPlayers.map((p) => p.name).includes(playerName) &&
    question.buzzedPlayers.length > 0 &&
    buzzerQueue.length === 0 &&
    (((question.type === "TEXT" || question.type === "IMAGE") && question.state === "ACTIVE") ||
      question.type === "VIDEO" ||
      question.type === "AUDIO");

  const canUseYoinkJoker =
    currentPlayer.name !== playerName &&
    player.yoinkJoker &&
    question.buzzedPlayers.length === 0 &&
    buzzerQueue.length === 0 &&
    currentGamestate.state === "QUESTION" &&
    currentGamestate.currentBoard.id === 1;
  const canUseNoYouJoker =
    currentGamestate.players[currentGamestate.currentPlayer].name === playerName &&
    player.noYouJoker &&
    question.buzzedPlayers.length === 0 &&
    buzzerQueue.length === 0 &&
    currentGamestate.state === "QUESTION" &&
    currentGamestate.currentBoard.id === 1;
  const canUseGamemasterJoker =
    currentPlayer.name !== playerName &&
    player.gmJoker === 1 &&
    currentGamestate.state === "BOARD" &&
    currentGamestate.currentBoard.id === 1;

  const handleYoinkJoker = () => {
    if (!canUseYoinkJoker) return;
    const id = query.get("id")!;
    const newGamestate = { ...currentGamestate };
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
    const newGamestate = { ...currentGamestate };
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
    const newGamestate = { ...currentGamestate };
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
        gamestate={currentGamestate}
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
        {currentGamestate.players.map((player, index) => (
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
            className={"jp-joker-card jp-joker-yoink" + (canUseYoinkJoker ? " jp-joker-active" : "")}
            onClick={handleYoinkJoker}
            disabled={!player.yoinkJoker}
            aria-disabled={!player.yoinkJoker}
          >
            <div className="jp-joker-row">
              <img className="jp-joker-icon" src="../../../jepoardy/Icon_Yoink.png" alt="" />
              <div className="jp-joker-title">YOINK</div>
            </div>
            <div className="jp-joker-subtitle">KLAUE DIE FRAGE EINES MITSPIELERS</div>
          </button>

          <button
            type="button"
            className={"jp-joker-card jp-joker-noyou" + (canUseNoYouJoker ? " jp-joker-active" : "")}
            onClick={handleNoYouJoker}
            disabled={!player.noYouJoker}
            aria-disabled={!player.noYouJoker}
          >
            <div className="jp-joker-row">
              <img className="jp-joker-icon" src="../../../jepoardy/Icon_NoYou.png" alt="" />

              <div className="jp-joker-title">NO YOU</div>
            </div>
            <div className="jp-joker-subtitle">EINE FRAGE WIRD WEITERGEGEBEN</div>
          </button>

          <button
            type="button"
            className={
              "jp-joker-card jp-joker-gamemaster" + (canUseGamemasterJoker ? " jp-joker-active" : "")
            }
            onClick={handleGamemasterJoker}
            disabled={player.gmJoker < 0}
            aria-disabled={player.gmJoker < 0}
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
