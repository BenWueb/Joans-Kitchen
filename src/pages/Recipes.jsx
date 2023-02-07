import { useContext, useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import RecipesContext from "../context/RecipesContext";
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  getDocs,
  docs,
} from "firebase/firestore";
import { db } from "../firestore.config";

function Recipes() {
  const { recipes } = useContext(RecipesContext);

  // PAGINATE AND FETCH LISTINGS ON DEMAND

  // const [lastFetchedListing, setLastFetchedListing] = useState();
  // const [recipes, setRecipes] = useState();

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const recipeRef = collectionGroup(db, "recipes");
  //       const q = query(recipeRef, limit(20));

  //       const recipeSnap = await getDocs(q);

  //       const lastVisible = recipeSnap.docs[recipeSnap.docs.length - 1];
  //       setLastFetchedListing(lastVisible);

  //       let recipesArr = [];

  //       recipeSnap.forEach((recipe) => {
  //         return recipesArr.push({
  //           id: recipe.id,
  //           data: recipe.data(),
  //           parent: recipe.ref.parent.parent.id,
  //         });
  //       });
  //       setRecipes(recipesArr);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchRecipes();
  // }, []);

  if (!recipes) {
    return;
  }

  return (
    <>
      <section></section>

      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Recipes</h1>
        <Filter />
        <div className="recipes-container">
          {recipes
            .sort((a, b) => {
              return a.data.title < b.data.title
                ? -1
                : a.data.title > b.data.title
                ? 1
                : 0;
            })
            .slice(0, 20)
            .map((recipe) => (
              <RecipeCard
                title={recipe.data.title}
                key={recipe.id}
                imgUrl={recipe.data.imgUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
}
export default Recipes;
