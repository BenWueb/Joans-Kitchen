import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipesContext from "../context/RecipesContext";
import Navbar from "../components/Navbar";

function Recipes() {
  const { recipes } = useContext(RecipesContext);

  return (
    <div className="container">
      <Navbar />
      <div className="page-container">
        {recipes
          .sort((a, b) => {
            return a.data.title < b.data.title
              ? -1
              : a.data.title > b.data.title
              ? 1
              : 0;
          })
          .map((recipe) => (
            <RecipeCard
              title={recipe.data.title}
              ingredients={recipe.data.ingredients}
              recipe={recipe.data.recipe}
              notes={recipe.data.notes}
            />
          ))}
      </div>
    </div>
  );
}
export default Recipes;
