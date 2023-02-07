import { useContext, useState, useEffect } from "react";
import RecipesContext from "../context/RecipesContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdShare, MdFavorite, MdModeEditOutline } from "react-icons/md";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firestore.config";
import { toast } from "react-toastify";

function SingleRecipe({
  title,
  ingredients,
  recipe,
  notes,
  createdBy,
  imageUrls,
}) {
  const { recipes, loading, currentUserData } = useContext(RecipesContext);
  const [like, setLike] = useState(false);

  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentUserData &&
      currentUserData.favorites.includes(params.recipeName)
    ) {
      setLike(true);
    }
  }, []);

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

  // Like Button
  const onClick = async () => {
    try {
      setLike((prevState) => !prevState);
      const auth = getAuth();
      const user = auth.currentUser.uid;

      const userRef = doc(db, "Users", user);

      if (!like) {
        await updateDoc(userRef, {
          favorites: arrayUnion(params.recipeName),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayRemove(params.recipeName),
        });
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const onEdit = () => {
    navigate(`/edit-recipe/${searchUrl}`);
  };

  const onShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <>
      <div className="single-recipe-card">
        <div className="single-icons">
          <MdFavorite
            onClick={onClick}
            className={like ? "single-like-true" : "single-like-false"}
          />
          <MdShare className="single-share" onClick={onShare} />
          {auth.currentUser && (
            <MdModeEditOutline className="single-edit" onClick={onEdit} />
          )}
        </div>
        <div className="single-recipe-header">
          <h4 className="single-title">{title.toLowerCase()}</h4>
          <h5>{createdBy}</h5>

          {notes && (
            <div className="single-notes-container">
              <h5 className="subtitle">Notes</h5>
              <p className="single-notes">{notes}</p>
            </div>
          )}
        </div>

        <div className="single-card-details">
          {ingredients && (
            <>
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
            </>
          )}

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
      <div className="single-recipe-image-grid">
        {imageUrls &&
          imageUrls.map((img) => (
            <div className="single-recipe-img-container">
              <a href={img} target="_blank">
                <img src={img} />
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
export default SingleRecipe;
