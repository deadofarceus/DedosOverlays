import { JepoardyQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function Text({ question }: JepoardyQuestionProps) {
  return (
    <div className={"jp-question-text " + "jp-question-" + question.state}>{question.question}</div>
  );
}

export default Text;
