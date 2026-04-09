import { Button } from "react-bootstrap";
import {
  JepoardyGameProps,
  JepoardyGameState,
  Question,
} from "../../../../types/gameshows/Jepoardy";
import { BroadcastWebsocket } from "../../../../types/WebsocketTypes";
import { useEffect, useState } from "react";
import { useQuery } from "../../../../types/UsefulFunctions";

let ws: BroadcastWebsocket<string>;

function BoardControls({
  gamestate,
  sendState,
  buzzerQueue,
  clearBuzzer,
  clearOneBuzzer,
}: JepoardyGameProps) {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }

  const question = gamestate.currentQuestion;

  const [startStopSignal, setStartStopSignal] = useState<string>("");

  useEffect(() => {
    if (!ws) {
      ws = new BroadcastWebsocket<string>(id + "_STARTSTOP", setStartStopSignal);
    }
  }, []);

  useEffect(() => {
    const prevFirstRef = (BoardControls as any)._prevFirstRef ?? { current: undefined };
    (BoardControls as any)._prevFirstRef = prevFirstRef;

    const first = buzzerQueue[0];
    if (
      (prevFirstRef.current !== undefined && prevFirstRef.current !== first) ||
      (prevFirstRef.current === undefined && buzzerQueue.length > 0)
    ) {
      const newGamestate = { ...gamestate };
      const q = newGamestate.currentQuestion;
      q.state = "INVISIBLE";
      const sent = "STOP";
      ws.sendData(sent);
      sendState(newGamestate);
    }
    prevFirstRef.current = first;
  }, [buzzerQueue]);

  const finishSpecificQuestion = (
    gamestate: JepoardyGameState,
    questionID: number
  ): JepoardyGameState => {
    const newGamestate = { ...gamestate };
    newGamestate.currentBoard.categories.forEach((cat) => {
      cat.questions.forEach((quest) => {
        quest.forEach((q) => {
          if (q.id === questionID) {
            quest[0].finished = true;
          }
        });
      });
    });

    if (question.extra !== "Windfury") {
      newGamestate.currentPlayer = (newGamestate.currentPlayer + 1) % newGamestate.players.length;
    }

    if (newGamestate.currentBoard.extra === "forced") {
      newGamestate.currentBoard.categories.forEach((cat) => {
        if (question.category === cat.name) {
          cat.extra = "forced";
        } else {
          cat.extra = "default";
        }
      });
    }

    return newGamestate;
  };

  const handleShowQuestion = () => {
    const newGamestate = { ...gamestate };

    const q = newGamestate.currentQuestion;
    q.state = q.state === "ACTIVE" ? "INVISIBLE" : "ACTIVE";

    console.log(startStopSignal);
    const sent = q.state === "ACTIVE" ? "START" : "STOP";

    ws.sendData(sent);

    sendState(newGamestate);
  };

  const handleVonVorne = () => {
    ws.sendData("CLEAR");
  };

  const handleFalscheAntwort = () => {
    const newGamestate = { ...gamestate };
    let buzzedPlayer = newGamestate.players.find((p) => p.name == buzzerQueue[0]);
    if (!buzzedPlayer) {
      buzzedPlayer = newGamestate.players[newGamestate.currentPlayer];
    } else {
      clearOneBuzzer(buzzerQueue[0]);
    }

    if (question.extra !== "Safezone") {
      buzzedPlayer.points -= question.points;
    }
    sendState(newGamestate);
  };

  const calculatePoints = (quest: Question): number => {
    let points = 0;
    switch (quest.extra) {
      case "Corrupted":
        points += 500 + quest.points;
        break;
      case "Gold":
        points += 2 * quest.points;
        break;
      default:
        break;
    }
    return points;
  };

  const handleRichtigeAntwort = () => {
    let newGamestate = { ...gamestate };
    let buzzedPlayer = newGamestate.players.find((p) => p.name == buzzerQueue[0]);
    if (!buzzedPlayer) {
      buzzedPlayer = newGamestate.players[newGamestate.currentPlayer];
    } else {
      clearBuzzer();
    }
    buzzedPlayer.points += calculatePoints(question);
    newGamestate.currentQuestion.state = "ACTIVE";
    newGamestate.currentQuestion.finished = true;
    newGamestate = finishSpecificQuestion(newGamestate, question.id);
    sendState(newGamestate);
  };

  const handleFinishQuestion = () => {
    let newGamestate = { ...gamestate };
    newGamestate.currentQuestion.state = "ACTIVE";
    newGamestate.currentQuestion.finished = true;
    newGamestate = finishSpecificQuestion(newGamestate, question.id);
    sendState(newGamestate);
  };

  const handleBackToBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.state = "BOARD";
    sendState(newGamestate);
  };

  const handleNextPlayer = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentPlayer = (newGamestate.currentPlayer + 1) % newGamestate.players.length;
    sendState(newGamestate);
  };

  let frageAufdecken = question.state === "ACTIVE" ? "Frage verstecken" : "Frage aufdecken";
  if (question.type === "AUDIO" || question.type === "VIDEO") {
    frageAufdecken = question.state === "ACTIVE" ? "Wiedergabe pausieren" : "Wiedergabe starten";
  }

  let wechsel = "Wechsel zu Board " + (gamestate.currentBoard.id === 1 ? 2 : 1);

  return (
    <div className="jp-boardControls centerC">
      <div className="centerR"></div>
      <Button variant="danger">AKTION ZURÜCK</Button>
      <Button variant="warning">AKTION VORWÄRTS</Button>
      {gamestate.state === "QUESTION" && (
        <>
          <Button variant="primary" onClick={handleShowQuestion}>
            {frageAufdecken}
          </Button>
          {(question.type === "AUDIO" || question.type === "VIDEO") && (
            <Button variant="danger" onClick={handleVonVorne}>
              Nochmal von Vorne
            </Button>
          )}
          <Button variant="danger" onClick={handleFalscheAntwort}>
            Falsche Antwort
          </Button>{" "}
          <Button variant="success" onClick={handleRichtigeAntwort}>
            Richtige Antwort
          </Button>{" "}
          <Button variant="danger" onClick={handleFinishQuestion}>
            Keiner kann beantworten
          </Button>{" "}
          <Button variant="warning" onClick={handleBackToBoard}>
            Zurück zum Board
          </Button>{" "}
          {question.type === "TEXT" && <div>{"Frage: " + question.question}</div>}
          <div>{"Antwort: " + question.answer}</div>
        </>
      )}

      {gamestate.state === "BOARD" && (
        <>
          <Button variant="secondary" onClick={handleNextPlayer}>
            Nächster ist am Zug
          </Button>
          <Button variant="success">Dreh das RAD!</Button>
          <Button variant="danger">{wechsel}</Button>
        </>
      )}
    </div>
  );
}

export default BoardControls;
