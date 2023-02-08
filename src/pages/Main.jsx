import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

import CategorySection from "../components/CategorySection";
import AddRecipeSection from "../components/AddRecipeSection";

function Main() {
  return (
    <>
      <div className="main-container">
        <header className="header-container">
          {window.innerWidth <= 810 ? (
            <MobileNavbar className="main-navbar" />
          ) : (
            <Navbar className="main-navbar" />
          )}
          <div className="header-content">
            <div className="main-title">
              <h1>Joan's</h1>
              <h1 className="kitchen">Kitchen</h1>
            </div>

            <div className="btn-container">
              <Link className="link" to="/recipes">
                <button className="btn browse">Browse Recipes</button>
              </Link>
              <Link to="/add-recipe" className="link">
                <button className="btn add">Add Recipe</button>
              </Link>
            </div>
          </div>
        </header>
        <CategorySection />
        <AddRecipeSection />
      </div>
    </>
  );
}
export default Main;
