import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiMenuAltRight } from "react-icons/bi";
import { MdOutlineClose, MdSearch } from "react-icons/md";
import RecipeContext from "../context/RecipesContext";
import { getAuth } from "firebase/auth";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
  }, []);

  const mobileContainer = {
    hidden: { opacity: 0, height: 100 },
    show: {
      opacity: 1,
      height: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const mobileListItem = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { delay: 0.3 } },
    exit: { opacity: 0, y: 0, transition: { duration: 0 } },
  };

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const { recipes, Logout } = useContext(RecipeContext);

  const navigate = useNavigate();
  const auth = getAuth();

  const onChange = (e) => {
    setSearch(e.target.value);

    const newFilter = recipes.filter((el) => {
      return el.data.title.toLowerCase().includes(search);
    });

    setSearchedRecipes(newFilter.slice(0, 15));
  };

  const signOut = () => {
    Logout();
    navigate("/");
  };

  return (
    <>
      <nav className="nav-container">
        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
        >
          <Link className="logo-link" to="/">
            <div className="logo">JK</div>
          </Link>
        </motion.h5>

        {windowWidth >= 899 && (
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
        )}

        <>
          <AnimatePresence>
            {menuVisible ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                exit={{ rotate: 0 }}
                className="icon-div"
              >
                <MdOutlineClose
                  style={{ color: "black" }}
                  onClick={toggleMenu}
                  className="mobile-menu-icon"
                />
              </motion.div>
            ) : (
              <motion.div className="icon-div">
                <BiMenuAltRight
                  onClick={toggleMenu}
                  className="mobile-menu-icon"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {menuVisible && (
              <motion.div
                initial={{ height: 0, width: 0 }}
                animate={{
                  height: window.innerWidth <= 900 ? "100%" : "600px",
                  width: window.innerWidth < 400 ? "100%" : "20rem",
                }}
                exit={{ height: 0, width: 0 }}
                variants={mobileContainer}
                className="mobile-menu-container"
              >
                {windowWidth <= 899 && (
                  <motion.div
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="search-container"
                  >
                    <input
                      type="text"
                      className="search"
                      placeholder="Search for a recipe..."
                      onChange={onChange}
                      value={search}
                    />

                    {/* <MdSearch className="search-icon" /> */}

                    {search !== "" && searchedRecipes.length !== 0 && (
                      <ul className="search-results">
                        {searchedRecipes.map((result) => {
                          const searchUrl = result.data.title
                            .toLowerCase()
                            .replace(
                              /[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g,
                              "_"
                            )
                            .replace(/\s/gi, "");
                          return (
                            <Link
                              className="search-link"
                              to={`/recipes/${searchUrl}`}
                            >
                              <li className="search-result">
                                {result.data.title.toLowerCase()}
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </motion.div>
                )}
                <Link className="link " to="/">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    Home
                  </motion.li>
                </Link>
                <Link className="link " to="/categories">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    Categories
                  </motion.li>
                </Link>
                <Link className="link " to="/recipes">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    Recipes
                  </motion.li>
                </Link>
                <Link className="link " to="/">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    About
                  </motion.li>
                </Link>
                {auth.currentUser ? (
                  <>
                    <Link className="link" to="/profile">
                      <motion.li
                        variants={mobileListItem}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="mobile-menu-item"
                      >
                        Profile
                      </motion.li>
                    </Link>
                    <Link className="link" to="/add-recipe">
                      <motion.li
                        variants={mobileListItem}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="mobile-menu-item"
                      >
                        Add Recipe
                      </motion.li>
                    </Link>
                    <motion.li
                      onClick={signOut}
                      variants={mobileListItem}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="mobile-menu-item"
                    >
                      Sign Out
                    </motion.li>
                  </>
                ) : (
                  <Link className="link " to="/login">
                    <motion.li
                      variants={mobileListItem}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="mobile-menu-item"
                    >
                      Login
                    </motion.li>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      </nav>
    </>
  );
}

export default Navbar;
