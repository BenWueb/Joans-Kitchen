import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import CategoryCard from "../components/CategoryCard";

function CategorySection() {
  const { categories } = useContext(RecipesContext);

  const shuffled = categories.sort(() => 0.5 - Math.random());

  return (
    <div>
      <div className="category-section-container">
        <h2 className="category-section-title">Categories</h2>
        <div className="category-cards-container">
          {shuffled.slice(0, 5).map((category) => (
            <CategoryCard
              name={category.id}
              key={category.id}
              imgUrl={category.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CategorySection;
