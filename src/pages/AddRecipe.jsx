import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Navbar from "../components/Navbar";
import RecipesContext from "../context/RecipesContext";
import { db } from "../firestore.config";
import { v4 as uuidv4 } from "uuid";

function AddRecipe() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    ingredients: "",
    recipe: "",
    createdBy: "",
    images: {},
    tags: [],
    notes: "",
  });

  const { category, title, ingredients, recipe, images, tags, notes } =
    formData;

  const {
    setCurrentUser,
    getUserData,
    categories,
    currentUserData,
    fetchRecipes,
  } = useContext(RecipesContext);

  const auth = getAuth();
  const navigate = useNavigate();

  // Updating state based on user input
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

  // Add recipe to database
  const onSubmit = async (e) => {
    e.preventDefault();

    // Add image to firestore and add image url to firebase
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
            console.log(uploadTask.snapshot.ref._location.path_);
            getDownloadURL(
              ref(storage, `${uploadTask.snapshot.ref._location.path_}_800x800`)
            ).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // Calls above function for each image
    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      console.log(error);
    });

    // Update form data with additional info
    const formDataCopy = {
      ...formData,
      title: title.toUpperCase(),
      imageUrls,
      createdBy: currentUserData.name,
      owner: auth.currentUser.uid,
      created: serverTimestamp(),
    };

    // Remove image array from formdata
    delete formDataCopy.images;

    // Convert title to URL format
    const searchUrl = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
      .replace(/\s/gi, "");

    // Add recipe to firebase and navigate to it
    const newRecipeRef = collection(db, `Recipes/${category}/recipes`);
    await addDoc(newRecipeRef, formDataCopy);
    fetchRecipes();
    navigate(`/recipes/${searchUrl}`);
  };

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <h1 style={{ marginTop: "2rem" }} className="page-title">
          Add Recipe
        </h1>
        <div className="form-page-container">
          <div className="form-container">
            <form className="form" onSubmit={onSubmit}>
              <label htmlFor="category">Category</label>
              <select
                className="recipe-input input-margin add-recipe-category"
                id="category"
                value={category}
                onChange={onChange}
                required
              >
                <option>Please select a Category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.id}
                  </option>
                ))}
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
                    tags && tags.includes("Salad")
                      ? "tag-btn-active"
                      : "tag-btn"
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
                placeholder="e.g. 
                1 Cup
                1 1/4 Tbs
                4 pinches"
                required
              />
              <p className="instructions">Use a new line for each ingredient</p>
              <label htmlFor="recipe">Recipe</label>
              <textarea
                className="recipe-input"
                id="recipe"
                value={recipe}
                type="text"
                placeholder="e.g. 
                1. Prep
                2. Cook
                3. Eat"
                onChange={onChange}
                required
              />
              <p className="instructions">
                Format is (Number)(Period) followed by (Text)
              </p>

              <label htmlFor="notes">Notes</label>
              <textarea
                className="recipe-input input-margin"
                id="notes"
                value={notes}
                type="text"
                onChange={onChange}
              />

              <label htmlFor="images">Images</label>
              <input
                className="recipe-input input-margin"
                id="images"
                type="file"
                onChange={onChange}
                max="6"
                accept=".jpg,.png,.jpeg"
                multiple
                required
              />
              <button type="submit" className="submit-btn btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddRecipe;
