import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Navbar from "../components/Navbar";
import { db } from "../firestore.config";
import { v4 as uuidv4 } from "uuid";
import RecipesContext from "../context/RecipesContext";

function EditRecipe() {
  const { currentUserData } = useContext(RecipesContext);
  const [formData, setFormData] = useState({
    id: "",
    tags: ["Please select a tag..."],
    category: "",
    title: "",
    ingredients: "",
    recipe: "",
    notes: "",
    updatedBy: "",
    updated: "",
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
    updatedBy,
    createdBy,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();

  const recipeName = params.recipeName.replace(/_/g, " ").toUpperCase();

  // Fetch recipe info and add to state
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = collectionGroup(db, "recipes");
        const q = query(recipeRef, where("title", "==", recipeName));

        const recipeSnap = await getDocs(q);

        recipeSnap.forEach((doc) => {
          setFormData(doc.data());
          setFormData((prevState) => ({
            ...prevState,
            category: doc.ref.parent.parent.id,
            id: doc.id,
          }));
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, []);

  // Update state based on user input
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

    // Add image to recipe
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

      // Call above function for each image
      const newImageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch((error) => {
        console.log(error);
      });

      // Add additional info to formdata
      const formDataCopy = {
        ...formData,
        imageUrls: arrayUnion(...newImageUrls),
        updatedBy: currentUserData.name,
        updated: serverTimestamp(),
      };

      delete formDataCopy.images;

      // Convert title to URL format
      const searchUrl = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
        .replace(/\s/gi, "");

      const newRecipeRef = doc(db, `Recipes/${category}/recipes/${id}`);

      // Update document and navigate to it
      await updateDoc(newRecipeRef, formDataCopy);
      navigate(`/recipes/${searchUrl}`);
    } else {
      // Add additional info to formdata
      const formDataCopy = {
        ...formData,
        updatedBy: currentUserData.name,
        updated: serverTimestamp(),
      };

      // Convert title to URL format
      const searchUrl = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, "_")
        .replace(/\s/gi, "");

      // Update document and navigate to it
      const newRecipeRef = doc(db, `Recipes/${category}/recipes/${id}`);
      await updateDoc(newRecipeRef, formDataCopy);
      navigate(`/recipes/${searchUrl}`);
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <h1 style={{ marginTop: "2rem" }} className="page-title">
          Edit Recipe
        </h1>
        <div className="form-page-container">
          <div className="form-container">
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
                <button
                  type="button"
                  id="tags"
                  onClick={onChange}
                  className={
                    tags && tags.includes("Notes")
                      ? "tag-btn-active"
                      : "tag-btn"
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
              <p className="instructions">Use a new line for each ingredient</p>
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
    </>
  );
}
export default EditRecipe;
