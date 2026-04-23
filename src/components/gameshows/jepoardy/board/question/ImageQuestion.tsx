import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function ImageQuestion({ question }: JepoardySingleQuestionProps) {
  return (
    <div
      className={
        "jp-question-image " + (question.state === "INVISIBLE" ? "jp-question-INVISIBLE" : "")
      }
    >
      <img src={`/jepoardy/images/${encodeURIComponent(question.question)}`} alt="" />
    </div>
  );
}

export default ImageQuestion;
