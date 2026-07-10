import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function ImageQuestion({ question }: JepoardySingleQuestionProps) {
  const invis = question.state === "INVISIBLE" && question.usedJokers === "";

  return (
    <div
      className={"jp-question-image " + (invis ? "jp-question-INVISIBLE" : "")}
      data-question-state={question.state}
    >
      <img
        src={`/jepoardy/images/${encodeURIComponent(question.question)}`}
        alt=""
        data-question-state={question.state}
      />
    </div>
  );
}

export default ImageQuestion;
