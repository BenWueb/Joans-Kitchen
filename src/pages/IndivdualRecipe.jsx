import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
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
  }, []);

  if (!recipe) {
    return;
  }

  return (
    <>
      <section></section>
      <div className="container">
        {window.innerWidth <= 810 ? <MobileNavbar /> : <Navbar />}
        <div className="page-container">
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
