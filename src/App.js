import Main from "./pages/Main";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import IndividualRecipe from "./pages/IndivdualRecipe";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Search from "./pages/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipesProvider } from "./context/RecipesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <RecipesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<Category />} />
            <Route path="/recipes/:recipeName" element={<IndividualRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/edit-recipe/:recipeName" element={<EditRecipe />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </RecipesProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
