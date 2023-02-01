import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Categories from "./pages/Categories";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
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
          <Route path="/recipes/:recipeName" element={<Recipe />} />
        </Routes>
      </Router>
    </RecipesProvider>
  );
}

export default App;
