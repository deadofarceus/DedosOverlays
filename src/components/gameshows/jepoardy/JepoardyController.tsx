import { useEffect, useState } from "react";
import "../../../styles/gameshows/Jepoardy.css";
import UserControls from "./admin/UserControls";
import JepoardyBoard from "./board/JepoardyBoard";
import { JepoardyGame, JepoardyGameState, TESTGamestate } from "../../../types/gameshows/Jepoardy";
import { clearBuzzer, clearOneBuzzer, useQuery } from "../../../types/UsefulFunctions";
import { GameshowWebsocket, GLOBALADDRESS } from "../../../types/WebsocketTypes";
import BoardControls from "./board/Boardcontrols";
import { Button, Form } from "react-bootstrap";
import { useAudioSettings } from "../../../context/AudioSettingsContext";

let ws: GameshowWebsocket<JepoardyGame>;

function JepoardyController() {
  document.body.className = "noOBS";
  const [gamestate, setGamestate] = useState<JepoardyGame>({
    currentState: 0,
    states: [TESTGamestate],
  });
  const [buzzerQueue, setBuzzerQueue] = useState<string[]>([]);
  const { buzzerVolume, setBuzzerVolume } = useAudioSettings();

  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }
  useEffect(() => {
    if (id && !ws) {
      ws = new GameshowWebsocket<JepoardyGame>(id, setGamestate, addBuzzer);
          // Preload all images from public/jepoardy/images
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

  const currentGamestate = gamestate.states[gamestate.currentState];

  const sendState = (newState: JepoardyGameState) => {
    const newGame = { ...gamestate };
    // newGame.states[newGame.currentState + 1] = newState;
    // newGame.currentState++;
    newGame.states[0] = newState;
    ws.sendData(newGame);
  };

  const sendGame = (newState: JepoardyGame) => {
    ws.sendData(newState);
  };

  const addBuzzer = (buzzer: string) => {
    setBuzzerQueue((prevQueue) => {
      if (buzzer === "CLEARBUZZERQUEUE") {
        return [];
      } else if (buzzer.startsWith("CLEAR_")) {
        const toRemove = buzzer.split("_")[1];
        return prevQueue.filter((b) => b !== toRemove);
      } else if (!prevQueue.includes(buzzer)) {
        return [...prevQueue, buzzer];
      }
      return prevQueue;
    });
  };

  const handleClearBuzzer = () => {
    clearBuzzer(query.get("id")!);
    setBuzzerQueue([]);
  };

  const handleClearOneBuzzer = (buzzer: string) => {
    clearOneBuzzer(query.get("id")!, buzzer);
  };

  const currentPlayer =
    buzzerQueue.length === 0
      ? currentGamestate.players[currentGamestate.currentPlayer]
      : currentGamestate.players.find((p) => p.name === buzzerQueue[0])!;

  return (
    <div className="jp-controller">
      <JepoardyBoard
        gamestate={currentGamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
      <div className="centerR jp-playerPointsTNDiv">
        {currentGamestate.players.map((player, index) => (
          <div
            key={index}
            className={
              "jp-playerPointsTN " + (player.name === currentPlayer.name ? "jp-ichbindran" : "")
            }
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.points}</div>
          </div>
        ))}
      </div>
      <BoardControls
        game={gamestate}
        sendGame={sendGame}
        gamestate={currentGamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
      />
      <UserControls
        gamestate={currentGamestate}
        sendState={sendState}
        buzzerQueue={buzzerQueue}
        clearBuzzer={handleClearBuzzer}
        clearOneBuzzer={handleClearOneBuzzer}
      />
      <Button variant="danger" className="jp-resetButton" onClick={() => {
        if (confirm("Bist du sicher, dass du das komplette Spiel zurücksetzen möchtest? Du kannst diese Aktion nicht widerrufen! Alle Fortschritte gehen verloren.")) {
          sendState(TESTGamestate)
        }
      }}>Reset Game</Button>
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

export default JepoardyController;
