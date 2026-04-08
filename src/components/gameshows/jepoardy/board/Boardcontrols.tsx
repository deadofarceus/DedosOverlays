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

function BoardControls({ gamestate, sendState, buzzerQueue }: JepoardyGameProps) {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }

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
      const q = newGamestate.board.question;
      q.state = "INVISIBLE";
      const sent = "STOP";
      ws.sendData(sent);
      sendState(newGamestate);
    }
    prevFirstRef.current = first;
  }, [buzzerQueue]);

  const question = gamestate.board.question;

  const finishSpecificQuestion = (
    gamestate: JepoardyGameState,
    question: string
  ): JepoardyGameState => {
    const newGamestate = { ...gamestate };
    newGamestate.board.categories.forEach((cat) => {
      cat.questions.forEach((quest) => {
        quest.forEach((q) => {
          if (q.question === question) {
            quest[0].finished = true;
          }
        });
      });
    });
    return newGamestate;
  };

  const handleShowQuestion = () => {
    const newGamestate = { ...gamestate };

    const q = newGamestate.board.question;
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
    const buzzedPlayer = newGamestate.players.find((p) => p.name == buzzerQueue[0]);
    if (buzzedPlayer) {
      if (question.extra !== "Safezone") {
        buzzedPlayer.points -= question.points;
      }
      sendState(newGamestate);
    }
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
    const buzzedPlayer = newGamestate.players.find((p) => p.name == buzzerQueue[0]);
    if (buzzedPlayer) {
      buzzedPlayer.points += calculatePoints(question);
      newGamestate.board.question.state = "ACTIVE";
      newGamestate.board.question.finished = true;
      newGamestate = finishSpecificQuestion(newGamestate, question.question);
      sendState(newGamestate);
    }
  };

  const handleFinishQuestion = () => {
    let newGamestate = { ...gamestate };
    newGamestate.board.question.state = "ACTIVE";
    newGamestate.board.question.finished = true;
    newGamestate = finishSpecificQuestion(newGamestate, question.question);
    sendState(newGamestate);
  };

  const handleBackToBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.board.state = "BOARD";
    sendState(newGamestate);
  };

  let frageAufdecken = question.state === "ACTIVE" ? "Frage verstecken" : "Frage aufdecken";
  if (question.type === "AUDIO" || question.type === "VIDEO") {
    frageAufdecken = question.state === "ACTIVE" ? "Wiedergabe pausieren" : "Wiedergabe starten";
  }

  return (
    <div className="jp-boardControls centerC">
      <div className="centerR"></div>
      <Button variant="danger">AKTION ZURÜCK</Button>
      <Button variant="warning">AKTION VORWÄRTS</Button>
      {gamestate.board.state === "QUESTION" && (
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

      {gamestate.board.state === "BOARD" && <Button variant="danger">Wechsel zu Board 2</Button>}
    </div>
  );
}

export default BoardControls;
