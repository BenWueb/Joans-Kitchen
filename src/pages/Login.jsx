import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CreateAccount from "../pages/CreateAccount";
import Navbar from "../components/Navbar";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

      const user = userCredential.user;

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section></section>
      <Navbar />
      <div className="form-page-container">
        <div className="form-container">
          <h1>Login</h1>
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
              type="text"
              placeholder="Password"
              onChange={onChange}
              required
            />
            <button type="submit" className="btn">
              Submit
            </button>
            <p>Forgot Password</p>
            <Link className="link form-link" to="/create-account">
              Create an Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
