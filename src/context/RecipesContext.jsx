import { createContext, useEffect, useState } from "react";
import {
  collectionGroup,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firestore.config";

const RecipesContext = createContext("test");
const auth = getAuth();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  // Get all Categories
  useEffect(() => {
    let categoriesArr = [];
    const fetchCategories = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "Recipes"));
        categorySnapshot.forEach((doc) => {
          return categoriesArr.push({
            id: doc.id,
            imgUrl: doc.data().imgUrl,
          });
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

  // Logout
  const Logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Current User
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            setCurrentUser(uid);
          } else {
            setCurrentUser(null);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  // Get current user data
  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        setCurrentUserData(docSnap.data());
      } catch (error) {
        setCurrentUserData(null);
        console.log(error);
      }
    };
    getCurrentUserData();
  }, [currentUser]);

  // Get current user data
  const getCurrentUserData = async () => {
    try {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      setCurrentUserData(docSnap.data());
    } catch (error) {
      setCurrentUserData(null);
      console.log(error);
    }
  };

  // Fetch recipes
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

  return (
    <div>
      <RecipesContext.Provider
        value={{
          recipes,
          categories,
          Logout,
          currentUser,
          setCurrentUser,
          currentUserData,
          setCurrentUserData,
          getCurrentUserData,
          fetchRecipes,
        }}
      >
        {children}
      </RecipesContext.Provider>
    </div>
  );
};
export default RecipesContext;
