import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const { recipes, loading, categories } = useContext(RecipesContext);
  if (!categories) {
    return;
  }
  return (
    <>
      <Navbar />

      {categories.map((category) => (
        <CategoryCard name={category} />
      ))}
    </>
  );
}
export default Categories;
