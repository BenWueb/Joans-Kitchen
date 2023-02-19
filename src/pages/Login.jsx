import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CreateAccount from "../pages/CreateAccount";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import RecipesContext from "../context/RecipesContext";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { setCurrentUser } = useContext(RecipesContext);

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setFormData({ email: "", password: "" });
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      toast.error("Invalid Credentials", {
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
        <h1 className="page-title">Login</h1>
        <div className="form-page-container">
          <div className="form-container">
            <form className="form" onSubmit={onSubmit}>
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
              <Link className="link form-link" to="/forgot-password">
                <p>Forgot Password</p>
              </Link>
              <Link className="link form-link" to="/create-account">
                Create an Account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
