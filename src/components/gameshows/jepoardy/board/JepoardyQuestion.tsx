import { JepoardySingleQuestionProps } from "../../../../types/gameshows/Jepoardy";
import Text from "./question/Text";
import AudioQuestion from "./question/AudioQuestion";
import VideoQuestion from "./question/VideoQuestion";
import ImageQuestion from "./question/ImageQuestion";
import JepoardyBoardQuestion from "./JepoardyBoardQuestion";
import BoardTimer from "../timer/BoardTimer";
import TextAndImage from "./question/TextAndImage";
import VideoAnswer from "./question/VideoAnswer";

function JepoardyQuestion({ question, gamestate, sendState }: JepoardySingleQuestionProps) {
  // and info isnt a date like  08.10.2013
  const showInfoInTitle =
    question.info !== undefined &&
    question.info.length < 15 &&
    question.info.match(/^\d{2}\.\d{2}\.\d{4}$/) === null;

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
          {question.type === "TEXTANDIMAGE" && (
            <TextAndImage question={question} sendState={sendState} gamestate={gamestate} />
          )}
          {question.finished && (
            <div
              className="jp-question-answer"
              style={question.id === 20 ? { fontSize: "36px" } : {}}
            >
              {question.answer}
            </div>
          )}
          {!question.finished && <BoardTimer />}
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

            {question.finished && question.answertype === "IMAGE" && (
              <div className="jp-question-image">
                <img src={`/jepoardy/images/${encodeURIComponent(question.answer)}`} alt="" />
              </div>
            )}
            {question.finished && question.answertype === "VIDEO" && (
              <VideoAnswer question={question} sendState={sendState} gamestate={gamestate} />
            )}

            {question.alternateAnswer && question.answertype === "IMAGE" && question.category !== "Hermits Gehilfe" && (
              <div
                className="jp-question-answer jp-question-alternate-answer"
              >
                {question.alternateAnswer}
              </div>
            )}

            {!question.finished && <BoardTimer />}
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
            {question.type === "TEXTANDIMAGE" && (
              <TextAndImage question={question} sendState={sendState} gamestate={gamestate} />
            )}
            {!question.finished && <BoardTimer />}
          </div>
        </div>
      );
    }
  }
}

export default JepoardyQuestion;
