import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function Text({ question }: JepoardySingleQuestionProps) {
  return (
    <div className={"jp-question-text " + "jp-question-" + question.state}>{question.question}</div>
  );
}

export default Text;
