import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import { db } from "../firestore.config";
import { collection, getDocs } from "firebase/firestore";

function Category() {
  const [categoryRecipes, setCategoryRecipes] = useState([]);

  const params = useParams();

  // Edit url to match databse name
  const categoryName = params.categoryName.replace(/_/g, " ");

  // Fetch recipes by category
  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const recipeSnapshot = await getDocs(
          collection(db, `Recipes/${categoryName}/recipes`)
        );
        let recipesArr = [];
        recipeSnapshot.forEach((recipe) => {
          return recipesArr.push({
            id: recipe.id,
            data: recipe.data(),
            parent: recipe.ref.parent.parent.id,
          });
        });
        setCategoryRecipes(recipesArr);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryRecipes();
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <div className="page-container">
          <h1 className="page-title">{categoryName}</h1>
          <div className="category-container">
            {categoryRecipes.map((recipe) => {
              return (
                <RecipeCard
                  title={recipe.data.title}
                  ingredients={recipe.data.ingredients}
                  recipe={recipe.data.recipe}
                  notes={recipe.data.notes}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Category;
