import { JepoardyQuestionProps } from "../../../../types/gameshows/Jepoardy";
import Text from "./question/Text";
import AudioQuestion from "./question/AudioQuestion";
import VideoQuestion from "./question/VideoQuestion";
import ImageQuestion from "./question/ImageQuestion";

function JepoardyQuestion({ question, gamestate, sendState }: JepoardyQuestionProps) {
  return (
    <div className="jp-question">
      <div className="jp-question-title">{question.category + " " + question.points}</div>

      <div className="jp-question-container">
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
      </div>

      {question.finished && <div className="jp-question-answer">{question.answer}</div>}
    </div>
  );
}

export default JepoardyQuestion;
