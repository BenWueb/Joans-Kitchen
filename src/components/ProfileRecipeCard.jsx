import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firestore.config";

function RecipeCard({ title, id, category, imageUrls }) {
  const { fetchRecipes } = useContext(RecipesContext);

  if (!title) {
    return;
  }

  // Convert title to url format
  const searchUrl = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&()*+,;=%]/g, "")
    .replace(/\s/gi, "_");

  const onDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteDoc(doc(db, `Recipes/${category}/recipes/${id}`));
      fetchRecipes();
    }
  };

  return (
    <div>
      <Link className="link category-link" to={`/recipes/${searchUrl}`}>
        <div className="category-card-mobile">
          <MdDeleteForever
            onClick={onDelete}
            className="profile-delete-button"
          />
          <img src={imageUrls[0]} alt="" className="category-image-mobile" />
          <div className="category-card-title-container-mobile">
            <h2>{title.toLowerCase()}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default RecipeCard;
