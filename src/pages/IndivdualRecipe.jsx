import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SingleRecipe from "../components/SingleRecipe";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from "../firestore.config";

function IndividualRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    notes: "",
    imageUrls: [],
    tags: [],
    created: "",
  });

  const params = useParams();

  //Edit url to match database name
  const recipeName = params.recipeName.replace(/_/g, " ").toUpperCase();

  // Fetch recipe using params
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = collectionGroup(db, "recipes");
        const q = query(recipeRef, where("title", "==", recipeName));

        const recipeSnap = await getDocs(q);

        recipeSnap.forEach((doc) => {
          const date = doc.data().created.toDate().toDateString();
          setRecipe(doc.data());
          setRecipe((prevState) => ({
            ...prevState,
            created: date,
          }));
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, [params]);

  if (!recipe) {
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
          <h1 className="page-title single-title">
            {recipe.title.toLowerCase()}
          </h1>
          <SingleRecipe
            title={recipe.title}
            ingredients={recipe.ingredients}
            recipe={recipe.recipe}
            notes={recipe.notes}
            createdBy={recipe.createdBy}
            imageUrls={recipe.imageUrls}
            tags={recipe.tags}
            created={recipe.created}
          />
        </div>
      </div>
    </>
  );
}
export default IndividualRecipe;
