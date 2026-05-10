import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function Text({ question }: JepoardySingleQuestionProps) {
  return <div className={"jp-question-text "}>{question.question}</div>;
}

export default Text;
