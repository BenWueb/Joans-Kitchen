import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BrowseSection from "../components/BrowseSection";
import CategorySection from "../components/CategorySection";
import AddRecipeSection from "../components/AddRecipeSection";

function Main() {
  return (
    <>
      <div className="container">
        <Navbar />
        <header className="header-container">
          <div className="header-content">
            <div className="main-title">
              <h1>Joan's</h1>
              <h1 className="kitchen">Kitchen</h1>
            </div>

            <div className="btn-container">
              <Link className="link" to="/recipes">
                <button className="btn browse">Browse Recipes</button>
              </Link>

              <button className="btn">Random Recipe</button>
            </div>
          </div>
        </header>
        <CategorySection />
        <BrowseSection />
        <AddRecipeSection />
      </div>
    </>
  );
}
export default Main;
