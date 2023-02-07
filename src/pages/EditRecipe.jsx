import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import CreateAccount from "../pages/CreateAccount";
import Navbar from "../components/Navbar";
import RecipesContext from "../context/RecipesContext";
import { db } from "../firestore.config";
import { v4 as uuidv4 } from "uuid";

function EditRecipe() {
  const [formData, setFormData] = useState({
    id: "",
    tags: ["Please select a tag..."],
    category: "",
    title: "",
    ingredients: "",
    recipe: "",
    notes: "",
    updatedBy: "",
    images: {},
    imageUrls: [],
  });

  const {
    id,
    tags,
    category,
    title,
    ingredients,
    recipe,
    notes,
    images,
    imageUrls,
  } = formData;

  const { setCurrentUser, categories, currentUserData, recipes } =
    useContext(RecipesContext);

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const setCurrentRecipe = () => {
      //Filter recipes by recipe
      const currentRecipe = recipes.filter((el) => {
        return el.data.title.toLowerCase() === recipeName;
      });
      setFormData(currentRecipe[0].data);

      setFormData((prevState) => ({
        ...prevState,
        id: currentRecipe[0].id,
        category: currentRecipe[0].parent,
        updatedBy: currentUserData.name,
        imageUrls: currentRecipe[0].data.imageUrls || [],
        tags: currentRecipe[0].data.tags || [],
      }));
    };
    setCurrentRecipe();
  }, []);

  //Edit url to match database name
  const recipeName = params.recipeName.replace(/_/g, " ");

  const onChange = (e) => {
    if (e.target.id === "tags") {
      if (tags.includes(e.target.innerText)) {
        setFormData((prevState) => ({
          ...prevState,
          tags: tags.filter((tag) => tag !== e.target.innerText),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          tags: [...tags, e.target.innerText],
        }));
      }
    }

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files && e.target.id !== "tags") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (images) {
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage();
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

          const storageRef = ref(storage, "images/" + fileName);

          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const newImageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch((error) => {
        console.log(error);
      });

      const formDataCopy = {
        ...formData,
        imageUrls: arrayUnion(...newImageUrls),
      };

      delete formDataCopy.images;

      const searchUrl = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
        .replace(/\s/gi, "");

      const newRecipeRef = doc(db, `Recipes/${category}/recipes/${id}`);
      console.log(formDataCopy);
      await updateDoc(newRecipeRef, formDataCopy);
      navigate(`/recipes/${searchUrl}`);
    } else {
      const formDataCopy = {
        ...formData,
      };

      const searchUrl = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
        .replace(/\s/gi, "");

      const newRecipeRef = doc(db, `Recipes/${category}/recipes/${id}`);
      await updateDoc(newRecipeRef, formDataCopy);
      navigate(`/recipes/${searchUrl}`);
    }
  };

  return (
    <div>
      <section></section>
      <Navbar />
      <div className="form-page-container">
        <div className="form-container">
          <h1>Edit Recipe</h1>
          <form className="form" onSubmit={onSubmit}>
            <label htmlFor="category">Category</label>
            <select
              className="recipe-input input-margin"
              id="category"
              value={category}
              onChange={onChange}
              required
              disabled
            >
              <option>{category}</option>
            </select>
            <label htmlFor="tags">Tags</label>
            <div className="edit-recipe-tags-container">
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Appetizer")
                    ? "tag-btn-active"
                    : "tag-btn"
                }
              >
                Appetizer
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Salad") ? "tag-btn-active" : "tag-btn"
                }
              >
                Salad
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Main") ? "tag-btn-active" : "tag-btn"
                }
              >
                Main
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Dessert")
                    ? "tag-btn-active"
                    : "tag-btn"
                }
              >
                Dessert
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Vegetarian")
                    ? "tag-btn-active"
                    : "tag-btn"
                }
              >
                Vegetarian
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Chicken")
                    ? "tag-btn-active"
                    : "tag-btn"
                }
              >
                Chicken
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Beef") ? "tag-btn-active" : "tag-btn"
                }
              >
                Beef
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Pork") ? "tag-btn-active" : "tag-btn"
                }
              >
                Pork
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Seafood")
                    ? "tag-btn-active"
                    : "tag-btn"
                }
              >
                Seafood
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Lamb") ? "tag-btn-active" : "tag-btn"
                }
              >
                Lamb
              </button>
              <button
                type="button"
                id="tags"
                onClick={onChange}
                className={
                  tags && tags.includes("Notes") ? "tag-btn-active" : "tag-btn"
                }
              >
                Notes
              </button>
            </div>

            <label htmlFor="title">Title</label>
            <input
              className="recipe-input input-margin"
              id="title"
              value={title}
              type="text"
              onChange={onChange}
              required
            />
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              className="recipe-input"
              id="ingredients"
              value={ingredients}
              type="text"
              onChange={onChange}
              required
            />
            <p className="instructions">
              Format is (Number) followed by (Text) e.g. 1 Cup 2 Oranges
            </p>
            <label htmlFor="recipe">Recipe</label>
            <textarea
              className="recipe-input"
              id="recipe"
              value={recipe}
              type="text"
              onChange={onChange}
              required
            />
            <p className="instructions">
              Format is (Number)(Period) followed by (Text) e.g. 1. Preheat oven
              2. Prep Veg
            </p>
            <label htmlFor="notes">Notes</label>
            <textarea
              className="recipe-input input-margin"
              id="notes"
              value={notes}
              type="text"
              onChange={onChange}
              disabled
            />
            <label htmlFor="images">Add Images</label>
            <input
              className="recipe-input input-margin"
              id="images"
              type="file"
              onChange={onChange}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              placeholder={imageUrls}
            />
            <button type="submit" className="btn submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditRecipe;
