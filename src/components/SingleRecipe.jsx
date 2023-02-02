import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link } from "react-router-dom";
import { MdShare } from "react-icons/md";

function SingleRecipe({ title, ingredients, recipe, notes }) {
  const { recipes, loading } = useContext(RecipesContext);

  if (!recipe) {
    return;
  }
  const steps = recipe.split(/\d[.]/gm);
  if (steps[0] === "") {
    steps.shift();
  }

  const searchUrl = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
    .replace(/\s/gi, "");

  return (
    <div>
      <div className="single-recipe-card">
        <MdShare className="single-share" />
        <div className="single-recipe-header">
          <h4 className="single-title">{title.toLowerCase()}</h4>

          {notes && (
            <div className="single-notes-container">
              <h5 className="subtitle">Notes</h5>
              <p className="single-notes">{notes}</p>
            </div>
          )}
        </div>
        <div className="single-card-details">
          <div className="single-ingredients-container">
            <h5 className="subtitle">Ingredients</h5>
            <ul className="single-ingredients">
              {ingredients
                .split(/(?<!\d)\s(?=(?<!x)\d(?![x]))/gm)
                .map((ing) => (
                  <li>{ing}</li>
                ))}
            </ul>
          </div>
          <div className="single-steps-container">
            <h5 className="subtitle">Steps</h5>
            <ol className="single-recipe">
              {steps.map((step) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleRecipe;
