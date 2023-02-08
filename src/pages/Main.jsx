import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import BrowseSection from "../components/BrowseSection";
import CategorySection from "../components/CategorySection";
import AddRecipeSection from "../components/AddRecipeSection";

function Main() {
  return (
    <>
      <div className="main-container">
        <header className="header-container">
          {window.innerWidth <= 810 ? <MobileNavbar /> : <Navbar />}
          <div className="header-content">
            <div className="main-title">
              <h1>Joan's</h1>
              <h1 className="kitchen">Kitchen</h1>
            </div>

            <div className="btn-container">
              <Link className="link" to="/recipes">
                <button className="btn browse">Browse Recipes</button>
              </Link>
              <Link to="/" className="link">
                <button className="btn">Random Recipe</button>
              </Link>
            </div>
          </div>
        </header>
        <CategorySection />
      </div>
    </>
  );
}
export default Main;
