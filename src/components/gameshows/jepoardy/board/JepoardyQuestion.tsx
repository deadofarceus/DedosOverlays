import { JepoardyQuestionProps } from "../../../../types/gameshows/Jepoardy";
import Audio from "./question/Audio";
import Text from "./question/Text";
import Image from "./question/Image";
import Video from "./question/Video";

function JepoardyQuestion({ question }: JepoardyQuestionProps) {
  return (
    <div>
      <div>{question.category + " " + question.points}</div>
      {question.type === "AUDIO" && <Audio question={question} />}
      {question.type === "TEXT" && <Text question={question} />}
      {question.type === "IMAGE" && <Image question={question} />}
      {question.type === "VIDEO" && <Video question={question} />}
    </div>
  );
}

export default JepoardyQuestion;
