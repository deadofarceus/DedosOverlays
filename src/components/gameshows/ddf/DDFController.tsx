import { useState, useEffect } from "react";
import "../../../styles/gameshows/DDFliegt.css";
import { DDFliegtGameState, DDFPlayer } from "../../../types/gameshows/DDFliegt";
import { useQuery } from "../../../types/UsefulFunctions";
import { BroadcastWebsocket } from "../../../types/WebsocketTypes";
import DDFPlayerControl from "./DDFPlayerControl";
import { Button } from "react-bootstrap";

const STARTGAMESTATE: DDFliegtGameState = {
  players: [
    {
      name: "Autophil",
      yourTurn: false,
      admin: true,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Kroko",
      admin: false,
      yourTurn: true,
      lifes: 3,
      invulnerable: true,
      answers: [true, false],
    },
    {
      name: "Kutcher",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Thunny",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Obsess",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Tolkin",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Broeki",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    {
      name: "Karni",
      yourTurn: false,
      admin: false,
      lifes: 3,
      invulnerable: false,
      answers: [true, false],
    },
    // {
    //   name: "Faister",
    //   yourTurn: false,
    //   admin: false,
    //   lifes: 3,
    //   invulnerable: false,
    //   answers: [true, false],
    // },
  ],
};

let ws: BroadcastWebsocket<DDFliegtGameState>;

function DDFController() {
  document.body.className = "noOBS";

  const query = useQuery();
  const [data, setData] = useState<DDFliegtGameState>(STARTGAMESTATE);

  const sendData = (newData: DDFliegtGameState) => {
    if (!ws) return;
    ws.sendData(newData);
  };

  useEffect(() => {
    const id = query.get("id");

    if (!ws && id) {
      ws = new BroadcastWebsocket<DDFliegtGameState>(id, setData);
    }
  }, [query]);

  const handlePlayerChange = (index: number, value: DDFPlayer) => {
    const newPlayers = [...data.players];
    newPlayers[index] = value;
    sendData({ ...data, players: newPlayers });
  };

  const handleLifeChange = (index: number, value: number) => {
    let newLifes = (data.players[index].lifes + value) % 4;
    if (newLifes < 0) newLifes = 0;

    handlePlayerChange(index, { ...data.players[index], lifes: newLifes });
  };

  const handleAnswerADD = (index: number, value: boolean) => {
    const newAnswers = [...data.players[index].answers];
    newAnswers.push(value);
    const newPlayers = [...data.players];
    newPlayers[index].answers = newAnswers;
    const playerIndex = newPlayers.findIndex((player) => player.yourTurn);
    newPlayers[playerIndex].yourTurn = false;
    newPlayers[(playerIndex + 1) % newPlayers.length].yourTurn = true;
    sendData({ ...data, players: newPlayers });
  };

  const handleSkipPlayer = () => {
    const newPlayers = [...data.players];
    const playerIndex = newPlayers.findIndex((player) => player.yourTurn);
    newPlayers[playerIndex].yourTurn = false;
    let increment = newPlayers[(playerIndex + 1) % newPlayers.length].admin ? 2 : 1;

    newPlayers[(playerIndex + increment) % newPlayers.length].yourTurn = true;
    sendData({ ...data, players: newPlayers });
  };

  const handleSwitchTurn = (index: number) => {
    const newPlayers = [...data.players];
    const playerIndex = newPlayers.findIndex((player) => player.yourTurn);
    if (!newPlayers[index].admin) {
      newPlayers[playerIndex].yourTurn = false;
      newPlayers[index].yourTurn = true;
      sendData({ ...data, players: newPlayers });
    }
  };

  const handleNameChange = (index: number, value: string) => {
    handlePlayerChange(index, { ...data.players[index], name: value });
  };

  const handleSwitchSequence = (index: number, newIndex: number) => {
    const newPlayers = [...data.players];
    const temp = newPlayers[index];
    newPlayers[index] = newPlayers[newIndex];
    newPlayers[newIndex] = temp;
    sendData({ ...data, players: newPlayers });
  };

  const resetAnswers = () => {
    const newPlayers = [...data.players];
    newPlayers.forEach((player) => {
      player.answers = [];
    });
    sendData({ ...data, players: newPlayers });
  };

  const playerTurnIndex = data.players.findIndex((player) => player.yourTurn);
  const finale = data.players.filter((player) => player.lifes > 0 && !player.admin).length === 2;

  return (
    <div className="ddf-controller-container">
      <div className="ddf-controller-players">
        {data.players.map((_player, index) => (
          <DDFPlayerControl
            key={index}
            players={data.players}
            index={index}
            finale={finale}
            handleLifeChange={handleLifeChange}
            handleNameChange={handleNameChange}
            handleSwitchTurn={handleSwitchTurn}
            handleSwitchSequence={handleSwitchSequence}
          />
        ))}
      </div>
      <div className="ddf-controller-question-container">
        <div className="ddf-controller-question">
          {"Frage geht an: " + data.players[playerTurnIndex].name}
          <br />
          {/* HIER FRAGE WENN ERWÜNSCHT*/}
        </div>
        <Button className="ddf-controlButton" variant="secondary" onClick={handleSkipPlayer}>
          Skip Player
        </Button>
        <Button
          className="ddf-controlButton"
          variant="success"
          onClick={() => handleAnswerADD(playerTurnIndex, true)}
        >
          RICHTIG
        </Button>
        <Button
          className="ddf-controlButton"
          variant="danger"
          onClick={() => handleAnswerADD(playerTurnIndex, false)}
        >
          FALSCH
        </Button>
        <Button className="ddf-controlButton" variant="warning" onClick={resetAnswers}>
          RESET Round
        </Button>
      </div>
    </div>
  );
}

export default DDFController;
