import { Category } from "../../../../types/gameshows/Jepoardy";

interface CategoryProps {
  category: Category;
}

function JepoardyCategory({ category }: CategoryProps) {
  return (
    <div>
      <div>{category.name}</div>
      <div>
        {category.questions.map((q, index) => (
          <div key={index}>{q.points}</div>
        ))}
      </div>
    </div>
  );
}

export default JepoardyCategory;
