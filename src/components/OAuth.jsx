import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firestore.config";
import { toast } from "react-toastify";
import google from "../assets/google-g-2015.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          favorites: [],
          recipes: [],
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could Not Authenticate with Google");
    }
  };

  return (
    <>
      <button onClick={onGoogle} className="btn submit-btn google-btn">
        <img src={google} alt="google" />
        Sign {location.pathname === "/create-account" ? "up" : "in"} with google
      </button>
    </>
  );
}
export default OAuth;
