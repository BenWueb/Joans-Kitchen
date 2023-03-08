import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link, useNavigate } from "react-router-dom";
import { MdShare, MdModeEditOutline } from "react-icons/md";

function RecipeCard({ title }) {
  const navigate = useNavigate();

  const { currentUserData } = useContext(RecipesContext);

  if (!title) {
    return;
  }

  const searchUrl = title
    .toLowerCase()
    .replace(/[._~:\/?#[\]@!$+;=%]/g, "")
    .replace(/\s/gi, "_");

  return (
    <>
      <Link className="link category-link" to={`/recipes/${searchUrl}`}>
        <div className="category-card">
          <div className="category-image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/joans-recipes.appspot.com/o/images%2Fanh-nguyen-kcA-c3f_3FE-unsplash_800x800.webp?alt=media&token=198179f2-7f57-41fb-8467-788ddcf73e74"
              alt="A bright and healthy salad"
              loading="lazy"
              className="category-image"
            />
          </div>
          <div className="category-card-title-container">
            <h2>{title.toLowerCase()}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}
export default RecipeCard;
