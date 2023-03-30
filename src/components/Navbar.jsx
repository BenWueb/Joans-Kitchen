import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiMenuAltRight } from "react-icons/bi";
import {
  MdOutlineClose,
  MdSearch,
  MdCabin,
  MdOutlineGridOn,
  MdLibraryBooks,
  MdOutlinePerson,
  MdOutlinePostAdd,
  MdLogout,
  MdInfoOutline,
} from "react-icons/md";
import RecipeContext from "../context/RecipesContext";
import { getAuth } from "firebase/auth";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { recipes, Logout } = useContext(RecipeContext);

  const navigate = useNavigate();
  const auth = getAuth();

  // Monitor window size for nav layout
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
  }, []);

  // Styling for nav container
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

  // Styling for nav items
  const mobileListItem = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { delay: 0.3 } },
    exit: { opacity: 0, y: 0, transition: { duration: 0 } },
  };

  // Close menu on click out
  // window.addEventListener('click', (e) => {

  // })

  // Toggle menu open/closed
  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  //Sign out
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
                  height: window.innerWidth <= 900 ? "100%" : "800px",
                  width: window.innerWidth < 400 ? "100%" : "20rem",
                }}
                exit={{ height: 0, width: 0 }}
                variants={mobileContainer}
                className="mobile-menu-container"
              >
                <Link className="link " to="/">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    <p>
                      <MdCabin />
                      Cabin
                    </p>
                  </motion.li>
                </Link>
                <Link className="link " to="/search">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    <p>
                      <MdSearch /> Search
                    </p>
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
                    <p>
                      <MdOutlineGridOn />
                      Categories
                    </p>
                  </motion.li>
                </Link>
                <Link className="link " to="/search">
                  <motion.li
                    variants={mobileListItem}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mobile-menu-item"
                  >
                    <p>
                      <MdLibraryBooks />
                      Recipes
                    </p>
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
                    <p>
                      <MdInfoOutline />
                      About
                    </p>
                  </motion.li>
                </Link>

                {/* If logged in display menu items else display logout */}
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
                        <p>
                          <MdOutlinePerson />
                          Profile
                        </p>
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
                        <p>
                          <MdOutlinePostAdd />
                          Add Recipe
                        </p>
                      </motion.li>
                    </Link>

                    <Link className="link" to="/">
                      <motion.li
                        onClick={signOut}
                        variants={mobileListItem}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="mobile-menu-item"
                      >
                        <p>
                          <MdLogout />
                          Sign Out
                        </p>
                      </motion.li>
                    </Link>
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
