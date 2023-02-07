import { MdMenu } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import RecipeContext from "../context/RecipesContext";
import { limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEast, MdSearch } from "react-icons/md";

function Navbar() {
  const [search, setSearch] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const { recipes, Logout, currentUser } = useContext(RecipeContext);

  const navigate = useNavigate();
  const auth = getAuth();

  const onChange = (e) => {
    setSearch(e.target.value);

    const newFilter = recipes.filter((el) => {
      return el.data.title.toLowerCase().includes(search);
    });

    setSearchedRecipes(newFilter.slice(0, 15));
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const signOut = () => {
    Logout();
    navigate("/");
  };

  return (
    <div className="nav-container">
      <Link className="link" to="/">
        <div className="logo">JK</div>
      </Link>
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search for a recipe..."
          onChange={onChange}
          value={search}
        />
        <MdSearch className="search-icon" />

        {search !== "" && searchedRecipes.length !== 0 && (
          <ul className="search-results">
            {searchedRecipes.map((result) => {
              const searchUrl = result.data.title
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
                .replace(/\s/gi, "");
              return (
                <Link className="search-link" to={`/recipes/${searchUrl}`}>
                  <li className="search-result">
                    {result.data.title.toLowerCase()}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>

      <MdMenu
        className="menu"
        onClick={toggleSidebar}
        style={{ width: "40px", height: "40px" }}
      />
      <div
        className={
          showSidebar ? "sidebar-wrapper show-sidebar" : "sidebar-wrapper"
        }
      >
        <div className="sidebar">
          <MdOutlineEast className="sidebar-button" onClick={toggleSidebar} />
          <Link className="link " to="/">
            <h4 className="menu-item">Home</h4>
          </Link>
          <Link className="link " to="/categories">
            <h4 className="menu-item">Categories</h4>
          </Link>
          <Link className="link " to="/recipes">
            <h4 className="menu-item">Recipes</h4>
          </Link>
          <Link className="link " to="/">
            <h4 className="menu-item">About</h4>
          </Link>
          {auth.currentUser ? (
            <>
              <Link className="link" to="/profile">
                <h4 className="menu-item">Profile</h4>
              </Link>
              <Link className="link" to="/add-recipe">
                <h4 className="menu-item">Add Recipe</h4>
              </Link>
              <h4 className="menu-item" onClick={signOut}>
                Sign Out
              </h4>
            </>
          ) : (
            <Link className="link " to="/login">
              <h4 className="menu-item">Login</h4>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
