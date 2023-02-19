import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

function AddRecipeSection() {
  const { recipes } = useContext(RecipesContext);

  if (!recipes) {
    return;
  }
  const shuffled = recipes.sort(() => 0.5 - Math.random());

  return (
    <>
      <section className="recipes-section-header">
        <div className="container">
          <div className="recipes-section-container">
            <h2 className="recipes-section-title">Recipes</h2>
            <div className="recipes-cards-container">
              {shuffled.slice(0, 8).map((category) => (
                <RecipeCard
                  title={category.data.title.toLowerCase()}
                  imgUrl={category.imgUrl}
                  key={category.id}
                />
              ))}
            </div>
            <div className="section-btn-container">
              <Link to="/recipes" className="link">
                <button className="btn btn-submit section-btn">
                  Browse all Recipes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AddRecipeSection;
