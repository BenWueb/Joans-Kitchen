import { Link } from "react-router-dom";

function RecipeCard({ title }) {
  if (!title) {
    return;
  }

  const searchUrl = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
    .replace(/\s/gi, "");

  return (
    <div>
      <Link className="link category-link" to={`/recipes/${searchUrl}`}>
        <div className="category-card-mobile">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/joans-recipes.appspot.com/o/images%2Fanh-nguyen-kcA-c3f_3FE-unsplash_800x800.webp?alt=media&token=198179f2-7f57-41fb-8467-788ddcf73e74"
            alt=""
            className="category-image-mobile"
          />
          <div className="category-card-title-container-mobile">
            <h2>{title.toLowerCase()}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default RecipeCard;
