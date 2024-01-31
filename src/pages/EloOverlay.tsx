import { useEffect, useState } from "react";
import {
  Account,
  AccountElo,
  ChampionMatchHistory,
} from "../types/LeagueTypes";
import { ModEvent } from "../types/BackendEvents";
import { useNavigate } from "react-router-dom";
import "../styles/EloOverlay.css";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const summonerName = params.get("name");
const tag = params.get("tag");
const key = params.get("key");

let socket: WebSocket;
let pingInterval: number;

function EloOverlay() {
  const oldAccount: object = {
    summonerId: "",
    name: "",
    hashtag: "",
    puuid: "",
    tier: "CHALLENGER",
    rank: "I",
    leaguePoints: 1337,
    combinedLP: 1337,
    wins: 205,
    loses: 173,
    hotstreak: false,
    lastThree: [
      {
        championName: "Veigar",
        championID: 497,
        win: false,
        id: "EUW1_6792213944",
      },
      {
        championName: "Bard",
        championID: 432,
        win: true,
        id: "EUW1_6792270986",
      },
      {
        championName: "Rakan",
        championID: 497,
        win: false,
        id: "EUW1_6792346795",
      },
      {
        championName: "Pyke",
        championID: 497,
        win: true,
        id: "EUW1_6792427799",
      },
      {
        championName: "Gragas",
        championID: 432,
        win: true,
        id: "EUW1_6792492999",
      },
    ],
    startTime: 1706645277,
    lpStart: 1295,
  };
  const [playerInfo, setPlayerInfo] = useState<Account>(oldAccount as Account);

  const nav = useNavigate();

  useEffect(() => {
    if (summonerName === null || tag === null || key === null) {
      // Redirect to error page if any of the parameters is missing
      nav("/errorpage");
    }

    if (!socket) {
      connectWebSocket(setPlayerInfo);
    }
    // Cleanup WebSocket on component unmount
    return () => {
      //   socket.close();
    };
  }, [nav]);

  playerInfo.lastThree = Array.from(
    new Set(playerInfo.lastThree.map((obj) => JSON.stringify(obj)))
  ).map((str) => JSON.parse(str));

  while (playerInfo.lastThree.length > 5) {
    playerInfo.lastThree.shift();
  }

  return (
    <div id="Player">
      <EloInfo
        eloLP={playerInfo.leaguePoints}
        eloDivision={playerInfo.tier}
        eloRank={playerInfo.rank}
        lpDiff={playerInfo.combinedLP - playerInfo.lpStart}
      />
      <div className="row">
        {playerInfo.lastThree.map((match, index) => (
          <Champion
            index={index * 4.5}
            championName={match.championName}
            win={match.win}
          />
        ))}
      </div>
    </div>
  );
}

function EloInfo({ eloLP, eloDivision, eloRank, lpDiff }: AccountElo) {
  return (
    <div id="playerInfo">
      <div className="ELO">
        <img src={`../../${eloDivision}.png`} className="eloimg" />
        <p>
          {eloDivision === "MASTER" ||
          eloDivision === "GRANDMASTER" ||
          eloDivision === "CHALLENGER"
            ? eloLP + " LP"
            : eloRank + " " + eloLP + " LP"}
        </p>
      </div>
      <div className="ELO">
        <div className="spacer"></div>
        <p className="lpDiff">Heute:</p>
        <p
          className="lpDiff"
          style={{ color: lpDiff >= 0 ? "#6eff57" : "#FF6565" }}
        >
          {lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`}
        </p>
      </div>
    </div>
  );
}

function Champion({ index, championName, win }: ChampionMatchHistory) {
  return (
    <div className="imgdiv">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${championName}.png`}
        alt=""
        className="profileImg"
        style={{
          width: `${120 - index}px`,
        }}
      />
      <img
        src={`../../${win}.png`}
        alt="Overlay Image"
        className="overlayIMG"
        style={{ width: `${120 - index}px` }}
      />
    </div>
  );
}

function connectWebSocket(
  callback: React.Dispatch<React.SetStateAction<Account>>
) {
  socket = new WebSocket(
    `wss://modserver-dedo.glitch.me?name=${summonerName}&tag=${tag}`
  );
  // socket = new WebSocket(`ws://localhost:8080?name=${summonerName}&tag=${tag}`);

  pingInterval = setInterval(() => socket.send("ping"), 60000);

  socket.onopen = function () {
    console.log("WebSocket-Verbindung hergestellt.");
    const modEvent = new ModEvent("league/listenAccount", {
      summonerName: summonerName,
      tag: tag,
      key: key,
    });
    socket.send(JSON.stringify(modEvent));
  };

  socket.onclose = function () {
    console.log(
      "WebSocket-Verbindung geschlossen. Versuche erneut zu verbinden..."
    );
    clearInterval(pingInterval);
    connectWebSocket(callback); // Verbindung nach 2 Sekunden erneut aufbauen
  };

  socket.onerror = function (error) {
    console.error("WebSocket-Fehler aufgetreten: ", error);
  };

  socket.onmessage = function (event) {
    const message = event.data;

    if (message === "pong") {
      return;
    }

    if (message === "refresh") {
      window.location.reload();
      return;
    }

    const data = JSON.parse(message);
    const account = data.accounts[0];
    console.log(account);

    account.lastThree.reverse();
    callback(account);
  };
}

export default EloOverlay;