import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RecipesContext from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import { db } from "../firestore.config";
import { collection, getDocs } from "firebase/firestore";

function Category() {
  const params = useParams();
  const { setLoading } = useContext(RecipesContext);

  const [categoryRecipes, setCategoryRecipes] = useState([]);

  //Edit url to match databse name
  const categoryName = params.categoryName.replace(/_/g, " ");

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
        // setLoading(false);
        setCategoryRecipes(recipesArr);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryRecipes();
  });

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
              const recipeUrl = recipe.data.title
                .toLowerCase()
                .replace(/[\s0-9._~:\/?#[\]@!$+,;=%]/g, "_")
                .replace(/\s/gi, "");

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
