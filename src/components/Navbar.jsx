import { MdMenu } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import RecipeContext from "../context/RecipesContext";
import { limit } from "firebase/firestore";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { recipes } = useContext(RecipeContext);

  const onChange = (e) => {
    setSearch(e.target.value);

    const newFilter = recipes.filter((el) => {
      if (el.data.title) {
        return el.data.title.toLowerCase().includes(search);
      }
    });

    setSearchedRecipes(newFilter.slice(0, 15));
  };

  return (
    <div className="nav-container">
      <Link to="/">
        <div className="logo">JK</div>
      </Link>
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search"
          onChange={onChange}
          value={search}
        />
        {search !== "" && (
          <ul className="search-results">
            {searchedRecipes.map((result) => (
              <Link className="search-link" to="/">
                <li className="search-result">
                  {result.data.title.toLowerCase()}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <MdMenu style={{ width: "40px", height: "40px" }} />
    </div>
  );
}
export default Navbar;
