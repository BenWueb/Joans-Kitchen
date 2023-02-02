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
              <Link className="link" to="/recipes">
                <button className="btn browse">Browse Recipes</button>
              </Link>

              <button className="btn">Random Recipe</button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
export default Main;
