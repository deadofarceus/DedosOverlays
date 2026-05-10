import { Button } from "react-bootstrap";
import { JepoardyGame, JepoardyGameState, Question } from "../../../../types/gameshows/Jepoardy";
import { BroadcastWebsocket } from "../../../../types/WebsocketTypes";
import { useEffect, useState } from "react";
import { useQuery } from "../../../../types/UsefulFunctions";

let ws: BroadcastWebsocket<string>;

interface BoardControlsProps {
  gamestate: JepoardyGameState;
  game: JepoardyGame;
  sendState: (newState: JepoardyGameState) => void;
  sendGame: (newState: JepoardyGame) => void;
  buzzerQueue: string[];
  clearBuzzer: () => void;
}

function BoardControls({ gamestate, sendState, buzzerQueue, clearBuzzer }: BoardControlsProps) {
  const query = useQuery();
  const id = query.get("id");
  if (!id) {
    return <></>;
  }

  const question = gamestate.currentQuestion;

  const [startStopSignal, setStartStopSignal] = useState<string>("FIRST");
  const [randomInt, setRandomInt] = useState(0);

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
      ((prevFirstRef.current !== undefined && prevFirstRef.current !== first) ||
        (prevFirstRef.current === undefined && buzzerQueue.length > 0)) &&
      !question.finished
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
    newGamestate.currentQuestion.state = "ACTIVE";
    newGamestate.currentQuestion.finished = true;
    newGamestate.currentBoard.categories.forEach((cat) => {
      cat.questions.forEach((quest) => {
        quest.forEach((q) => {
          if (q.id === questionID) {
            quest[0].finished = true;
          }
        });
      });
    });

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

    console.log(q);

    q.state = q.state === "ACTIVE" ? "INVISIBLE" : "ACTIVE";

    const sent = q.state === "ACTIVE" ? "START" : "STOP";
    console.log(sent);

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
      clearBuzzer();
    }

    if (question.extra !== "Safezone") {
      buzzedPlayer.points -= question.points / 2;
    }
    newGamestate.currentQuestion.buzzedPlayers.push(buzzedPlayer);

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
        points += quest.points;
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
    newGamestate.currentQuestion.buzzedPlayers.push(buzzedPlayer);
    buzzedPlayer.points += calculatePoints(question);
    newGamestate = finishSpecificQuestion(newGamestate, question.id);
    sendState(newGamestate);
  };

  const handleFinishQuestion = () => {
    let newGamestate = { ...gamestate };
    let buzzedPlayer = newGamestate.players.find((p) => p.name == buzzerQueue[0]);
    if (!buzzedPlayer) {
      buzzedPlayer = newGamestate.players[newGamestate.currentPlayer];
    } else {
      clearBuzzer();
    }
    newGamestate.currentQuestion.buzzedPlayers.push(buzzedPlayer);
    newGamestate = finishSpecificQuestion(newGamestate, question.id);
    sendState(newGamestate);
  };

  const handleBackToBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.state = "BOARD";
    if (question.extra !== "Windfury") {
      newGamestate.currentPlayer = (newGamestate.currentPlayer + 1) % newGamestate.players.length;
    }
    sendState(newGamestate);
  };

  const handleNextPlayer = () => {
    const newGamestate = { ...gamestate };
    newGamestate.currentPlayer = (newGamestate.currentPlayer + 1) % newGamestate.players.length;
    sendState(newGamestate);
  };

  const handleDrehDasRad = () => {
    const newGamestate = { ...gamestate };
    if (gamestate.currentBoard.extra === "DREHDASRAD") {
      const randomSpin = Math.random() * 360;
      const spinDegree = 10 * 360 + randomSpin;

      let calcExtra = calculateExtra(randomSpin);

      let boardExtra = "default";
      let extra: "Windfury" | "Active" | "Taunt" | "Gold" | "Inactive" | "Safezone" | "Corrupted";
      if (calcExtra === "forced") {
        boardExtra = "forced";
        extra = "Active";
      } else {
        extra = calcExtra;
      }

      console.log(spinDegree, calcExtra, extra, boardExtra);

      ws.sendData("DREHDASRAD_" + spinDegree);

      setTimeout(() => {
        // oder mit einem Button??????
        if (boardExtra === "forced") {
          newGamestate.currentBoard.extra = "forced";
        } else {
          newGamestate.currentBoard.extra = "default";

          const allQuestionsArr = newGamestate.currentBoard.categories.flatMap(
            (cat) => cat.questions
          );

          const top5 = [...allQuestionsArr].sort((a, b) => b[0].points - a[0].points).slice(0, 5);

          const candidates = allQuestionsArr.filter((q) => !q[0].finished && !top5.includes(q));
          shuffle(candidates)
            .slice(0, 5)
            .forEach((q) => {
              q.forEach((qdd: Question) => (qdd.extra = extra));
            });
          console.log(candidates);
        }
        sendState(newGamestate);
      }, 8000); // TODO change
    } else {
      newGamestate.currentBoard.extra = "DREHDASRAD";
      sendState(newGamestate);
    }
  };

  const handleChangeBoard = () => {
    const newGamestate = { ...gamestate };
    newGamestate.state = "BOARD";
    newGamestate.boards[newGamestate.currentBoard.id] = newGamestate.currentBoard;
    newGamestate.currentBoard = newGamestate.boards[newGamestate.currentBoard.id === 0 ? 1 : 0];
    sendState(newGamestate);
  };

  // const moveState = (delta: number) => {
  //   const newGame = { ...game };
  //   newGame.currentState += delta;
  //   if (newGame.currentState < 0) {
  //     newGame.currentState = 0;
  //   } else if (newGame.currentState >= newGame.states.length) {
  //     newGame.currentState = newGame.states.length - 1;
  //   }
  //   sendGame(newGame);
  // };

  const handleRandomQuestion = () => {
    if (startStopSignal.startsWith("STARTRANDOM")) {
      const newGamestate = { ...gamestate };
      newGamestate.state = "QUESTION";
      newGamestate.currentQuestion =
        newGamestate.currentRandomQuestions[
          (randomInt - 1) % newGamestate.currentRandomQuestions.length
        ];
      sendState(newGamestate);
    } else {
      const length = gamestate.currentRandomQuestions.length;
      const ticks = Math.random() * length + length * 5;
      setRandomInt(Math.floor(ticks));
      ws.sendData("STARTRANDOM_" + Math.floor(ticks));
    }
  };

  let frageAufdecken = question.state === "ACTIVE" ? "Frage verstecken" : "Frage aufdecken";
  if (question.type === "AUDIO" || question.type === "VIDEO") {
    frageAufdecken = question.state === "ACTIVE" ? "Wiedergabe pausieren" : "Wiedergabe starten";
  }

  let wechsel = "Wechsel zu Board " + (gamestate.currentBoard.id === 0 ? 2 : 1);

  let allQuestions = gamestate.currentBoard.categories.flatMap((cat) => cat.questions).flat();

  const finishedQuestionsCount = allQuestions.filter((q) => q.finished).length;
  const alreadySpinned =
    allQuestions.filter((q) => !(q.extra === "Active" || q.extra === "Inactive")).length > 0 ||
    gamestate.currentBoard.extra === "forced";

  const radDrehAble =
    gamestate.state === "BOARD" &&
    gamestate.currentBoard.id === 1 &&
    finishedQuestionsCount >= 4 &&
    !alreadySpinned;

  let drehDasRad = "Lass das RAD erscheinen";
  if (gamestate.currentBoard.extra === "DREHDASRAD") {
    drehDasRad = "Dreh das RAD!";
  }

  let randomQuestion = "Ziehe Zufällige Kategorie";
  if (startStopSignal.startsWith("STARTRANDOM")) {
    randomQuestion = "Zur Frage Wechseln";
  }

  let backToBoard = gamestate.currentQuestion.buzzedPlayers.length === 0 || question.finished;

  const currentPlayer =
    buzzerQueue.length === 0
      ? gamestate.players[gamestate.currentPlayer]
      : gamestate.players.find((p) => p.name === buzzerQueue[0])!;

  return (
    <div className="jp-boardControls centerR">
      <div className="centerC">
        {/* <Button variant="danger" onClick={() => moveState(-1)}>
          AKTION ZURÜCK
        </Button>
        <Button variant="warning" onClick={() => moveState(1)}>
          AKTION VORWÄRTS
        </Button> */}
      </div>
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
          {!question.finished &&
            (buzzerQueue.length > 0 || question.buzzedPlayers.length === 0) && (
              <div className="centerC">
                <Button variant="danger" onClick={handleFalscheAntwort}>
                  Falsche Antwort von {currentPlayer.name}
                </Button>{" "}
                <Button variant="success" onClick={handleRichtigeAntwort}>
                  Richtige Antwort von {currentPlayer.name}
                </Button>{" "}
              </div>
            )}
          <div className="centerC">
            {!question.finished && (
              <Button variant="danger" onClick={handleFinishQuestion}>
                Lösung Aufdecken
              </Button>
            )}{" "}
            {backToBoard && (
              <Button variant="warning" onClick={handleBackToBoard}>
                Zurück zum Board
              </Button>
            )}
          </div>
          <div className="centerC">
            {question.type === "TEXT" && <div>{"Frage: " + question.question}</div>}
            <div className="jp-answer">{"Antwort: " + question.answer}</div>
          </div>
        </>
      )}
      {gamestate.state === "RANDOMQUESTION" && (
        <>
          <Button variant="success" onClick={handleRandomQuestion}>
            {randomQuestion}
          </Button>
        </>
      )}

      {gamestate.state === "BOARD" && (
        <>
          <Button variant="secondary" onClick={handleNextPlayer}>
            Nächster ist am Zug
          </Button>
          <Button variant="danger" onClick={handleChangeBoard}>
            {wechsel}
          </Button>
        </>
      )}
      {radDrehAble && (
        <Button variant="success" onClick={handleDrehDasRad}>
          {drehDasRad}
        </Button>
      )}
    </div>
  );
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function calculateExtra(
  spin: number
): "Windfury" | "Taunt" | "Gold" | "Safezone" | "Corrupted" | "forced" {
  return "Taunt";
  if (spin < 30) {
    return "Gold";
  }
  if (spin < 90) {
    return "Taunt";
  }
  if (spin < 150) {
    return "forced";
  }
  if (spin < 210) {
    return "Corrupted";
  }
  if (spin < 270) {
    return "Safezone";
  }
  if (spin < 330) {
    return "Windfury";
  }
  if (spin < 360) {
    return "Gold";
  }
  return "forced";
}

export default BoardControls;
