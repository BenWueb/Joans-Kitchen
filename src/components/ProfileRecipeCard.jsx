import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../firestore.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RecipeCard({ title, id, category, setCurrentUser }) {
  const navigate = useNavigate();
  const auth = getAuth();

  if (!title) {
    return;
  }

  const searchUrl = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
    .replace(/\s/gi, "");

  const onDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteDoc(doc(db, `Recipes/${category}/recipes/${id}`));
      window.location.reload();
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
          <img
            src="https://images.unsplash.com/photo-1621852003709-763b0b32da0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW50aXBhc3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
