import { useState, useEffect } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import { JepoardyGame, JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { buzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import JepoardyBoard from "./board/JepoardyBoard";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";
import DedoCopy from "../../util/DedoCopy";

let ws: GameshowWebsocket<JepoardyGame>;
const _preloadedImages: HTMLImageElement[] = [];
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
          const imageFiles = [
      "1700_-200.png",
      "2937_-1000.png",
      "4500_-_400.png",
      "5030_-_800.png",
      "6850_-_600.png",
      "Aatrox.jpg",
      "AatroxClassic.jpg",
      "Aatroxaugen.jpg",
      "Aatroxbrust.jpg",
      "Aatroxhand.jpg",
      "Aatroxhufte.jpg",
      "Aatroxlippen.jpg",
      "Amumu_0.jpg",
      "Annie.png",
      "Ascension.jpg",
      "Aurora_0.jpg",
      "BossKayn.jpg",
      "Dominion.jpg",
      "FakerWhatWasThat.png",
      "FiddleSticks_0.jpg",
      "Fiddlesticks_Classic.png",
      "FioraClassic.jpg",
      "Fiora_0.jpg",
      "GA_ohne_Beschreibung_bzw_Build.png",
      "GangplankImp.png",
      "Garen_0.jpg",
      "Get_Jinxed.png",
      "IreliaClassic.jpg",
      "Irelia_0.jpg",
      "Janna_Tailwind_old.jpg",
      "Judgement_Kayle.jpg",
      "KDA_Kaisa_Prestige_Edition.jpg",
      "Kayle_Righteous_Fury_old.jpg",
      "LeonaAugen.png",
      "LeonaBrust.png",
      "LeonaClassic.png",
      "LeonaHand.png",
      "LeonaHufte.png",
      "LeonaLippen.png",
      "Leona_0.jpg",
      "Ludens_Pulse.jpg",
      "Ludens_Tempest_item.jpg",
      "Lux.jpg",
      "LuxImp.png",
      "Luxaugen.jpg",
      "Luxbrust.jpg",
      "Luxhand.jpg",
      "Luxhufte.jpg",
      "Luxlippen.jpg",
      "Mana_Potion_item_old.jpg",
      "MaximFarm.png",
      "MordekaiserClassic.jpg",
      "Mordekaiser_0.jpg",
      "Morgana.jpg",
      "MorganaImp.png",
      "Morganaaugen.jpg",
      "Morganabrust.jpg",
      "Morganahand.jpg",
      "Morganahufte.jpg",
      "Morganalippen.jpg",
      "NasusAugen.png",
      "NasusBrust.png",
      "NasusHand.png",
      "NasusHufte.png",
      "NasusLippen.png",
      "Nasus_0.jpg",
      "Odyssey.jpg",
      "PhilLeeSin.png",
      "Poppy.jpg",
      "Poppyaugen.jpg",
      "Poppybrust.jpg",
      "Poppyhand.jpg",
      "Poppyhufte.jpg",
      "Poppylippen.jpg",
      "ProjectSkins.png",
      "ReportJohnny.png",
      "Rusty_Blitzcrank.jpg",
      "Ryze.jpg",
      "Ryzeaugen.jpg",
      "Ryzebrust.jpg",
      "Ryzehand.jpg",
      "Ryzehufte.jpg",
      "Ryzelippen.jpg",
      "ShyvanaAugen.png",
      "ShyvanaBrust.png",
      "ShyvanaHand.png",
      "ShyvanaHufte.png",
      "ShyvanaLippen.png",
      "Shyvana_0.jpg",
      "Sightstone.jpg",
      "Singed_old.jpg",
      "SleepingSola.png",
      "SorakaImp.png",
      "Soraka_E.jpg",
      "StarGuardian.jpg",
      "Swarm.jpg",
      "Sword_of_the_Occult_item.jpg",
      "Syndra_0.jpg",
      "Taschenrechner.png",
      "TwistedFate.jpg",
      "TwistedFateaugen.jpg",
      "TwistedFatebrust.jpg",
      "TwistedFatehand.jpg",
      "TwistedFatehufte.jpg",
      "TwistedFatelippen.jpg",
      "UrgotClassic.jpg",
      "Varus.jpg",
      "Varusaugen.jpg",
      "Varusbrust.jpg",
      "Varushand.jpg",
      "Varushufte.jpg",
      "Varuslippen.jpg",
      "ViegoAugen.png",
      "ViegoBrust.png",
      "ViegoHand.png",
      "ViegoHufte.png",
      "ViegoLippen.png",
      "Viego_0.jpg",
      "Vlesk_Schule.png",
      "WarwickClassic.jpg",
      "YoungRyzeUndSilverKayle.jpg",
      "Yunara.png",
      "ZileanAugen.png",
      "ZileanBrust.png",
      "ZileanHand.png",
      "ZileanHufte.png",
      "ZileanLippen.png",
      "Zilean_0.jpg",
      "ZzRot_Portal.png",
      "brand__leo_r.png",
      "frozen_mallet_ohne_preis.png",
      "ga_frage.png",
      "gaganz.png",
      "innervating_locket.png",
      "innervating_locket_ohne_stats.png",
      "kassadin__malz_w.png",
      "locketganz.png",
      "malletganz.png",
      "rabadons_frage.png",
      "rabadons_ohne_build.png",
      "rabaganz.png",
      "rell__skarner_e.png",
      "twin_shadows_frage.png",
      "twin_shadows_ohne_build.png",
      "twinganz.png",
      "twitch_zaheen_w_auf_r.png",
      "yasuo__janna_p.png",
    ];
    imageFiles.forEach((file) => {
      const img = new Image();
      img.src = `/jepoardy/images/${file}`;
      _preloadedImages.push(img); // prevent GC from cancelling the download
    });

    // Preload all videos from public/jepoardy/video
    const videoFiles = [
      "Darius.mp4",
      "DariusComplete.mp4",
      "KeinWbisLevel4.mp4",
      "KeinWbisLevel4Complete.mp4",
      "Mitfahrgelegenheit.mp4",
      "MitfahrgelegenheitComplete.mp4",
      "Mori.mp4",
      "MoriComplete.mp4",
      "StillTheMain.mp4",
      "StillTheMainComplete.mp4",
    ];
    videoFiles.forEach((file) => {
      fetch(`/jepoardy/video/${file}`, { cache: "force-cache" });
    });
    }

    const fetchData = async () => {
      const res = await fetch(`https://${GLOBALADDRESS}/persistantdata/${id}`);
      if (res.ok) {
        const data = await res.json();
        setGamestate(data.data);
      } else {
        console.log(res.statusText);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentGamestate.state === "QUESTION") {
      setBuzzerQueue([]);
    }
  }, [currentGamestate.state]);

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

  const finishedQuestions = currentGamestate.currentBoard.categories.flatMap((cat) => cat.questions).filter((q) => q[0].finished);

  const buzzerShowing = currentGamestate.state === "QUESTION" && !question.finished;

  const buzzerPressable =
    !question.buzzedPlayers.map((p) => p.name).includes(playerName) &&
    (question.buzzedPlayers.length > 0 || (finishedQuestions.length > 22 && currentGamestate.currentBoard.id === 1)) &&
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
    newGamestate.currentQuestion.usedJokers = "Yoink";
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
    newGamestate.currentQuestion.usedJokers = "NoYou";
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

        <div className="centerC w-50" style={{height: "200px"}}>
          {buzzerShowing && (
          <Button
            variant="danger"
            className={
              "buzzerButton blackOutline " + (buzzerPressable ? "" : "buzzerButtonDisabled")
            }
            onClick={handleBuzzer}
          >
            BUZZER
          </Button>
          )}
        </div>

      <div className="centerC w-50">
          <div>DEIN VDO Ninja Camera Link:</div>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={`https://vdo.ninja/?room=${id}&hash=c4db&q&push=${playerName}`}
              readOnly
              aria-describedby="basic-addon2"
              className="link"
            />

            <DedoCopy textToCopy={`https://vdo.ninja/?room=${id}&hash=c4db&q&push=${playerName}`} />
          </InputGroup>
        </div>

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
