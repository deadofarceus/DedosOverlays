import { Category } from "../../../../types/gameshows/Jepoardy";

interface CategoryProps {
  category: Category;
}

function JepoardyCategory({ category }: CategoryProps) {
  return (
    <div className={"jp-category " + "jp-cat-" + category.extra}>
      <div className="jp-category-name">
        <p>{category.name}</p>
      </div>
      <div className="jp-category-questions">
        {category.questions.map((q, index) => (
          <div className={"jp-category-question " + "jp-" + q[0].extra} key={index}>
            <p>{q[0].points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JepoardyCategory;
