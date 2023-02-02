import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Categories from "./pages/Categories";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import IndividualRecipe from "./pages/IndivdualRecipe";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipesProvider } from "./context/RecipesContext";

function App() {
  return (
    <RecipesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories/:categoryName" element={<Category />} />
          <Route path="/recipes/:recipeName" element={<IndividualRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </RecipesProvider>
  );
}

export default App;
