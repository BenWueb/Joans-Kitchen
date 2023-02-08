import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, addDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import CreateAccount from "../pages/CreateAccount";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
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
  });

  const { category, title, ingredients, recipe, images, tags } = formData;

  const { setCurrentUser, getUserData, categories, currentUserData } =
    useContext(RecipesContext);

  const auth = getAuth();

  const navigate = useNavigate();

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

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      console.log(error);
    });

    const formDataCopy = {
      ...formData,
      title: title.toUpperCase(),
      imageUrls,
      createdBy: currentUserData.name,
      owner: auth.currentUser.uid,
    };

    delete formDataCopy.images;

    const searchUrl = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
      .replace(/\s/gi, "");

    const newRecipeRef = collection(db, `Recipes/${category}/recipes`);
    await addDoc(newRecipeRef, formDataCopy);
    navigate(`/recipes/${searchUrl}`);
  };

  return (
    <>
      <section></section>
      <div className="container">
        {window.innerWidth <= 810 ? <MobileNavbar /> : <Navbar />}

        <div className="form-page-container">
          <div className="form-container">
            <h1>Add Recipe</h1>
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
                  <option value={cat.id}>{cat.id}</option>
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
                Format is (Number)(Period) followed by (Text) e.g. 1. Preheat
                oven 2. Prep Veg
              </p>

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
