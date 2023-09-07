import Navbar from "../components/Navbar";
import { getAuth } from "firebase/auth";
import SearchBar from "../components/SearchBar";

function Main() {
  const auth = getAuth();
  return (
    <>
      <section className="header">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="container">
          <header className="header-container">
            <div className="header-content">
              <div className="main-title">
                <h1>Joan's Kitchen</h1>
              </div>

              <SearchBar />
              {/* <div className="btn-container">
                {auth.currentUser ? (
                  <Link to="/add-recipe" className="link">
                    <button className="btn ">Add Recipe</button>
                  </Link>
                ) : (
                  <Link to="/create-account" className="link">
                    <button className="btn ">Sign Up</button>
                  </Link>
                )}
              </div> */}
            </div>
          </header>
        </div>
      </section>
    </>
  );
}
export default Main;
