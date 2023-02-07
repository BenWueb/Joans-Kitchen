import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipesContext from "../context/RecipesContext";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";

function Recipes() {
  const { recipes } = useContext(RecipesContext);

  if (!recipes) {
    return;
  }

  return (
    <>
      <section></section>

      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Recipes</h1>
        <Filter />
        <div className="recipes-container">
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
                key={recipe.id}
                imgUrl={recipe.data.imgUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
}
export default Recipes;
