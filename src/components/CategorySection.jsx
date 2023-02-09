import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

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
        <div className="section-btn-container">
          <Link to="/categories" className="link">
            <button className="btn btn-submit section-btn">
              Browse all Categories
              <MdKeyboardArrowRight className="icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CategorySection;
