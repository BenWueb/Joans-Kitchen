import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firestore.config";
import Navbar from "../components/Navbar";
import OAuth from "../components/OAuth";

import { toast } from "react-toastify";

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    favorites: [],
    recipes: [],
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "Users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      toast.error("Unable to create account", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="container">
        <h1 className="page-title">Create Account</h1>
        <div className="form-page-container">
          <div className="form-container">
            <form className="form" onSubmit={onSubmit}>
              <label htmlFor="name">Name</label>
              <input
                className="input"
                id="name"
                value={name}
                type="text"
                placeholder="Name"
                onChange={onChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                className="input"
                id="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={onChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={onChange}
                required
              />
              <button type="submit" className="btn submit-btn">
                Submit
              </button>
              <p>Or</p>
              <OAuth />
              <Link className="link form-link" to="/login">
                <p>Login</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateAccount;
