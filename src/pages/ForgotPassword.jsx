import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const auth = getAuth();

  // Add user input to state
  const onChange = (e) => {
    setFormData({
      email: e.target.value,
    });
  };

  // Submit email to server and send password reset email
  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      await sendPasswordResetEmail(auth, email);
      setFormData({ email: "" });
      toast.success("Email sent!");
      navigate("/login");
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
        <h1 className="page-title">Forgot Password</h1>
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

              <button type="submit" className="btn submit-btn">
                Submit
              </button>

              <Link className="link form-link" to="/create-account">
                Create an Account
              </Link>
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
export default ForgotPassword;
