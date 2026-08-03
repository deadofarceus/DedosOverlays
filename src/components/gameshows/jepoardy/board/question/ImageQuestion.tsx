import { JepoardySingleQuestionProps } from "../../../../../types/gameshows/Jepoardy";

function ImageQuestion({ question }: JepoardySingleQuestionProps) {
  const invis = question.state === "INVISIBLE" && question.usedJokers === "";
  const imposter = question.category === "Impostor";
  let imposterQ: string[] = [];
  if (imposter) {
    imposterQ = question.question.split(" ");
  }

  return (
    <div
      className={"jp-question-image " + (invis ? "jp-question-INVISIBLE" : "")}
      data-question-state={question.state}
    >
      {question.extraQuestion && <div className="jp-question-text">{question.extraQuestion}</div>}
      {imposter && <div className="jp-question-imposter-imgs">
        {imposterQ.map((img) => (
          <img
            key={img}
            src={`https://ddragon.leagueoflegends.com/cdn/16.15.1/img/champion/${encodeURIComponent(img)}.png`}
            alt=""
            data-question-state={question.state}
          />
        ))}
        </div>}
        {!imposter &&
          <img
            src={`/jepoardy/images/${encodeURIComponent(question.question)}`}
            alt=""
            data-question-state={question.state}
          />
        }
    </div>
  );
}

export default ImageQuestion;
