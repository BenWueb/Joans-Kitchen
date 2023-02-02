import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firestore.config";
import Navbar from "../components/Navbar";

function Profile() {
  const [userData, setUserData] = useState({});

  const { name, email, favorites, recipes } = userData;

  useEffect(() => {
    try {
      const getUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser.uid;

        const docRef = doc(db, "Users", user);
        const docSnap = await getDoc(docRef);

        setUserData(docSnap.data());
      };
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <section></section>
      <Navbar />
      <div className="page-container">
        <div className="profile-container">
          <h1>{name}</h1>
          <div className="favorites-container">
            <h4>Favorites</h4>
          </div>
          <div className="recipes-container">
            <h4>Recipes</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
