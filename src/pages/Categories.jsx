import { useContext } from "react";
import RecipesContext from "../context/RecipesContext";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const { recipes, loading, categories } = useContext(RecipesContext);

  if (!categories) {
    return;
  }

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <div className="page-container">
          <h1 className="page-title">Categories</h1>
          <div className="categories-container">
            {categories.map((category) => (
              <CategoryCard
                name={category.id}
                key={category.id}
                imgUrl={category.imgUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Categories;
