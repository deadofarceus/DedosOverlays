import { JepoardyQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function ImageQuestion({ question }: JepoardyQuestionProps) {
  console.log(question);

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
