import { useContext } from "react";
import { useParams } from "react-router-dom";
import RecipesContext from "../context/RecipesContext";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import RecipeCard from "../components/RecipeCard";

function Recipe() {
  const params = useParams();
  const { recipes } = useContext(RecipesContext);

  if (!recipes) {
    return;
  }

  //Edit url to match database name
  const recipeName = params.recipeName.replace(/_/g, " ");

  //Filter recipes by recipe
  const recipe = recipes.filter((el) => {
    return el.data.title.toLowerCase() === recipeName;
  });

  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar />
      </div>

      <RecipeCard
        title={recipe[0].data.title}
        ingredients={recipe[0].data.ingredients}
        recipe={recipe[0].data.recipe}
        notes={recipe[0].data.notes}
      />
    </div>
  );
}
export default Recipe;
