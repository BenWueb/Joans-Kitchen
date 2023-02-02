import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link } from "react-router-dom";
import { MdShare } from "react-icons/md";

function RecipeCard({ title, ingredients, recipe, notes }) {
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
      <Link className="link" to={`/recipes/${searchUrl}`}>
        <div className="recipe-card">
          <MdShare className="share" />
          <div className="recipe-header">
            <h4 className="title">{title.toLowerCase()}</h4>

            {notes && (
              <div className="notes-container">
                <h5>Notes</h5>
                <p className="notes">{notes}</p>
              </div>
            )}
          </div>
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
          </div>
        </div>
      </Link>
    </div>
  );
}
export default RecipeCard;
