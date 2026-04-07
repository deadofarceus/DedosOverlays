import { Category, JepoardyGameState } from "../../../../types/gameshows/Jepoardy";
import JepoardyBoardQuestion from "./JepoardyBoardQuestion";

interface CategoryProps {
  category: Category;
  sendState: (newState: JepoardyGameState) => void;
  gamestate: JepoardyGameState;
}

function JepoardyCategory({ category, sendState, gamestate }: CategoryProps) {
  return (
    <div className={"jp-category " + "jp-cat-" + category.extra}>
      <div className="jp-category-name">
        <p>{category.name}</p>
      </div>
      <div className="jp-category-questions">
        {category.questions.map((q, index) => (
          <JepoardyBoardQuestion
            key={index}
            questions={q}
            gamestate={gamestate}
            sendState={sendState}
          />
        ))}
      </div>
    </div>
  );
}

export default JepoardyCategory;
