import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";

function AddRecipeSection() {
  const { recipes } = useContext(RecipesContext);

  if (!recipes) {
    return;
  }
  const shuffled = recipes.sort(() => 0.5 - Math.random());

  return (
    <div>
      <div className="recipes-section-container">
        <h2 className="recipes-section-title">Recipes</h2>
        <div className="recipes-cards-container">
          {shuffled.slice(0, 5).map((category) => (
            <RecipeCard
              title={category.data.title.toLowerCase()}
              imgUrl={category.imgUrl}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default AddRecipeSection;
