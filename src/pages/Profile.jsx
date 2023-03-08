import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import RecipesContext from "../context/RecipesContext";
import { getAuth } from "firebase/auth";
import RecipeCardMobile from "../components/RecipeCardMobile";
import ProfileRecipeCard from "../components/ProfileRecipeCard";
import { MdEmail, MdPerson } from "react-icons/md";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    currentUserData,
    setCurrentUserData,
    recipes,
    setCurrentUser,
    getCurrentUserData,
    fetchRecipes,
  } = useContext(RecipesContext);

  useEffect(() => {
    getCurrentUserData();
  }, [recipes]);

  if (!currentUserData) {
    return;
  }

  const { name, email, favorites } = currentUserData;

  const currentUserRecipes = recipes.filter((recipe) => {
    return recipe.data.createdBy === currentUserData.name;
  });

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <div className="page-container">
          <h1 className="page-title">{currentUserData.name}'s Profile</h1>
          <div className="profile-container">
            <div className="account-info-container">
              <h2>Account Info</h2>
              <div className="account-info">
                <h4>Name</h4>
                <div className="name-input">
                  <input
                    className="input"
                    type="text"
                    value={name}
                    id="email"
                    disabled
                  />
                  <MdPerson className="md-person" />
                </div>
                <h4>Email</h4>
                <div className="email-input">
                  <input
                    className="input"
                    type="text"
                    value={email}
                    id="email"
                    disabled
                  />
                  <MdEmail className="md-email" />
                </div>
              </div>
            </div>

            <div className="favorites-container">
              <h2>Favorites</h2>
              <div className="favorites-grid">
                {favorites.map((fav) => (
                  <RecipeCardMobile title={fav.replace(/_/g, " ")} key={fav} />
                ))}
              </div>
            </div>
            <div className="profile-recipes-container">
              <h2>Recipes</h2>
              <div className="favorites-grid">
                {currentUserRecipes.map((recipe) => (
                  <>
                    <ProfileRecipeCard
                      title={recipe.data.title}
                      category={recipe.parent}
                      imageUrls={recipe.data.imageUrls}
                      id={recipe.id}
                      setCurrentUser={setCurrentUser()}
                    />
                  </>
                ))}
              </div>
              <button
                onClick={() => navigate("/add-recipe")}
                className="btn submit-btn profile-btn"
              >
                Add Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
