import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import loginImg from "../assets/image1.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false); // ✅ popup state
  const navigate = useNavigate(); // ✅ navigation after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    // ✅ Show success popup
    setShowPopup(true);

    // ✅ Hide popup and redirect after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      navigate("/dashboard"); // change to your desired page
    }, 2000);
  };

  return (
    <div className="auth-container">
      {/* Left Image */}
      <div className="auth-image">
        <img src={loginImg} alt="Login" />
      </div>

      {/* Right Form */}
      <div className="auth-form">
        <div className="form-card">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-primary">Login</button>
          </form>

          <p className="auth-footer">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      {/* ✅ Popup message */}
      {showPopup && (
        <div className="popup-msg">
          ✅ Successfully Logged In! Redirecting...
        </div>
      )}
    </div>
  );
}
