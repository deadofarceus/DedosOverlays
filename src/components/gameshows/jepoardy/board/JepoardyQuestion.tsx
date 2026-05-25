import { JepoardySingleQuestionProps } from "../../../../types/gameshows/Jepoardy";
import Text from "./question/Text";
import AudioQuestion from "./question/AudioQuestion";
import VideoQuestion from "./question/VideoQuestion";
import ImageQuestion from "./question/ImageQuestion";
import JepoardyBoardQuestion from "./JepoardyBoardQuestion";

function JepoardyQuestion({ question, gamestate, sendState }: JepoardySingleQuestionProps) {
  const showInfoInTitle = question.info !== undefined && question.info.length < 15;

  if (question.answertype === "TEXT") {
    return (
      <div className="jp-question">
        <div className="jp-question-container">
          <JepoardyBoardQuestion
            questions={[question]}
            sendState={sendState}
            gamestate={gamestate}
          />
          <div className="jp-question-title">
            {question.category + " " + (showInfoInTitle ? " - " + question.info : "")}
          </div>

          {question.joker && (
            <div className={"jp-question-joker " + "jp-question-joker-" + question.joker}>
              <img
                className="jp-question-joker-img"
                src={"../../../jepoardy/Icon_" + question.joker + ".png"}
                alt=""
              />
              {question.joker.toUpperCase()}
            </div>
          )}

          {question.type === "AUDIO" && (
            <AudioQuestion question={question} sendState={sendState} gamestate={gamestate} />
          )}
          {question.type === "TEXT" && (
            <Text question={question} sendState={sendState} gamestate={gamestate} />
          )}
          {question.type === "IMAGE" && (
            <ImageQuestion question={question} sendState={sendState} gamestate={gamestate} />
          )}
          {question.type === "VIDEO" && (
            <VideoQuestion question={question} sendState={sendState} gamestate={gamestate} />
          )}
          {question.finished && <div className="jp-question-answer">{question.answer}</div>}
        </div>
      </div>
    );
  } else {
    if (question.finished) {
      return (
        <div className="jp-question">
          <div className="jp-question-container">
            <JepoardyBoardQuestion
              questions={[question]}
              sendState={sendState}
              gamestate={gamestate}
            />
            <div className="jp-question-title">
              {question.category + " " + (showInfoInTitle ? " - " + question.info : "")}
            </div>

            {question.joker && <div className="jp-question-joker">{question.joker}</div>}

            {question.finished && (
              <div
                className={
                  "jp-question-image " +
                  (question.state === "INVISIBLE" ? "jp-question-INVISIBLE" : "")
                }
              >
                <img src={`/jepoardy/images/${encodeURIComponent(question.answer)}`} alt="" />
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="jp-question">
          <div className="jp-question-container">
            <JepoardyBoardQuestion
              questions={[question]}
              sendState={sendState}
              gamestate={gamestate}
            />
            <div className="jp-question-title">
              {question.category + " " + (showInfoInTitle ? " - " + question.info : "")}
            </div>

            {question.joker && <div className="jp-question-joker">{question.joker}</div>}

            {question.type === "AUDIO" && (
              <AudioQuestion question={question} sendState={sendState} gamestate={gamestate} />
            )}
            {question.type === "TEXT" && (
              <Text question={question} sendState={sendState} gamestate={gamestate} />
            )}
            {question.type === "IMAGE" && (
              <ImageQuestion question={question} sendState={sendState} gamestate={gamestate} />
            )}
            {question.type === "VIDEO" && (
              <VideoQuestion question={question} sendState={sendState} gamestate={gamestate} />
            )}
            {question.finished && (
              <div
                className={
                  "jp-question-image " +
                  (question.state === "INVISIBLE" ? "jp-question-INVISIBLE" : "")
                }
              >
                <img src={`/jepoardy/images/${encodeURIComponent(question.question)}`} alt="" />
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default JepoardyQuestion;
