import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function TextAndImage({ question }: JepoardySingleQuestionProps) {
  const extraImg = question.info !== undefined && (question.info.includes(".jpg") || question.info.includes(".png") || question.info.includes(".jpeg") || question.info.includes(".gif"));

  return (
    <div className={"jp-question-text"}>
      {question.question}
      {extraImg && <img className="jp-question-extra-img" src={`/jepoardy/images/${encodeURIComponent(question.info!)}`} alt="" />}
    </div>
  );
}

export default TextAndImage;