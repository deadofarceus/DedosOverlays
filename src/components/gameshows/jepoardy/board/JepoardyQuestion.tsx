import { JepoardySingleQuestionProps } from "../../../../types/gameshows/Jepoardy";
import Text from "./question/Text";
import AudioQuestion from "./question/AudioQuestion";
import VideoQuestion from "./question/VideoQuestion";
import ImageQuestion from "./question/ImageQuestion";
import JepoardyBoardQuestion from "./JepoardyBoardQuestion";

function JepoardyQuestion({ question, gamestate, sendState }: JepoardySingleQuestionProps) {
  return (
    <div className="jp-question">
      <div className="jp-question-container">
        <JepoardyBoardQuestion questions={[question]} sendState={sendState} gamestate={gamestate} />
        <div className="jp-question-title">
          {question.category + " " + (question.info ? " - " + question.info : "")}
        </div>
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
}

export default JepoardyQuestion;
