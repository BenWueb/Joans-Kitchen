import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const { recipes, loading, categories } = useContext(RecipesContext);
  if (!categories) {
    return;
  }
  return (
    <div className="container">
      <Navbar />
      <div className="page-container">
        <div className="categories-container">
          {categories.map((category) => (
            <CategoryCard name={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Categories;
