import { useContext } from "react";
import { Link } from "react-router-dom";
import RecipesContext from "../context/RecipesContext";
import CategoryCard from "../components/CategoryCard";

function CategorySection() {
  const { categories } = useContext(RecipesContext);

  // Display random categories on home page
  const shuffled = categories.sort(() => 0.5 - Math.random());

  return (
    <>
      <section className="category-section-header">
        <div className="container">
          <div className="category-section-container">
            <div className="category-cards-container">
              {shuffled.slice(0, 10).map((category) => (
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
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CategorySection;
