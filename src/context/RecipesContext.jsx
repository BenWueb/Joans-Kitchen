import { createContext, useEffect, useState } from "react";
import { collectionGroup, collection, getDocs } from "firebase/firestore";
import { db } from "../firestore.config";

const RecipesContext = createContext("test");

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  let categoriesArr = [];

  // Get all Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "Recipes"));
        categorySnapshot.forEach((doc) => {
          return categoriesArr.push(doc.id);
        });
        setCategories(categoriesArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Get all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeSnapshot = await getDocs(collectionGroup(db, "recipes"));
        let recipesArr = [];
        recipeSnapshot.forEach((recipe) => {
          return recipesArr.push({
            id: recipe.id,
            data: recipe.data(),
            parent: recipe.ref.parent.parent.id,
          });
        });
        setRecipes(recipesArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <RecipesContext.Provider value={{ recipes, categories }}>
        {children}
      </RecipesContext.Provider>
    </div>
  );
};
export default RecipesContext;
