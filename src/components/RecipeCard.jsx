import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";

function RecipeCard({ title, ingredients, recipe, notes }) {
  const { recipes, loading } = useContext(RecipesContext);

  if (!recipe) {
    return;
  }
  const steps = recipe.split(/\d[.]/gm);
  if (steps[0] === "") {
    steps.shift();
  }

  return (
    <div>
      <div className="recipe-card">
        <h4 className="title">{title.toLowerCase()}</h4>
        <div className="card-details">
          <div className="ingredients-container">
            <h5>Ingredients</h5>
            <ul className="ingredients">
              {ingredients
                .split(/(?<!\d)\s(?=(?<!x)\d(?![x]))/gm)
                .map((ing) => (
                  <li>{ing}</li>
                ))}
            </ul>
          </div>
          <div className="steps-container">
            <h5>Steps</h5>
            <ol className="recipe">
              {steps.map((step) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
          <p className="notes">{notes}</p>
        </div>
      </div>
    </div>
  );
}
export default RecipeCard;
