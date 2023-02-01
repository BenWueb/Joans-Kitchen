import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Main() {
  return (
    <>
      <div className="container">
        <header className="header-container">
          <Navbar />
          <div className="header-content">
            <h1>Joan's Kitchen</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
              perspiciatis ab, dolorem soluta debitis odit veritatis ea est
              minima consequuntur.
            </p>
            <div className="btn-container">
              <Link to="/recipes">
                <button className="btn">Browse Recipes</button>
              </Link>

              <button className="btn">Random Recipe</button>
            </div>
          </div>
        </header>
        <div className="sidebar">
          <Link to="/categories">
            <h4>Categories</h4>
          </Link>
          <Link to="/recipes">
            <h4>Recipes</h4>
          </Link>
          <h4>About</h4>
          <h4>Login</h4>
        </div>
      </div>
    </>
  );
}
export default Main;
