import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const auth = getAuth();

  const onChange = (e) => {
    setFormData({
      email: e.target.value,
    });
  };

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
      <section></section>
      <div className="container">
        {window.innerWidth <= 810 ? <MobileNavbar /> : <Navbar />}
        <div className="form-page-container">
          <div className="form-container">
            <h1>Forgot Password</h1>
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
