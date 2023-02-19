import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

function Category() {
  const params = useParams();
  const { recipes } = useContext(RecipesContext);

  if (!recipes) {
    return;
  }

  //Edit url to match databse name
  const categoryName = params.categoryName.replace(/_/g, " ");

  //Filter recipes by category
  const filteredRecipes = recipes.filter((el) => {
    return el.parent === categoryName;
  });

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <div className="page-container">
          <h1 className="page-title">{categoryName}</h1>
          <div className="category-container">
            {filteredRecipes.map((recipe) => {
              const recipeUrl = recipe.data.title
                .toLowerCase()
                .replace(/[\s0-9._~:\/?#[\]@!$+,;=%]/g, "_")
                .replace(/\s/gi, "");

              return (
                <RecipeCard
                  title={recipe.data.title}
                  ingredients={recipe.data.ingredients}
                  recipe={recipe.data.recipe}
                  notes={recipe.data.notes}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Category;
