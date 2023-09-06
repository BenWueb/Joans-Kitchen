import { Link } from "react-router-dom";

function RecipeCard({ title }) {
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
              src="https://firebasestorage.googleapis.com/v0/b/joans-recipes.appspot.com/o/images%2F96BI44rNPkZcSOZ3wCl4B197Xwr1-anh-nguyen-kcA-c3f_3FE-unsplash.jpg-e7d7932a-f73b-4d6c-8500-e733e7503520_800x800?alt=media&token=95d80d74-2134-42ee-b5ba-5f04df160312"
              alt="A bright and healthy salad"
              loading="lazy"
              className="category-image"
            />
          </div>
          <div className="category-card-title-container">
            <h4>{title.toLowerCase()}</h4>
          </div>
        </div>
      </Link>
    </>
  );
}
export default RecipeCard;
