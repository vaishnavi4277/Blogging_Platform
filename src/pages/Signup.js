import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import signupImg from "../assets/imagess.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false); // ✅ popup state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate signup success (replace with API call later)
    console.log("Signup Data:", formData);

    // ✅ Show popup
    setShowPopup(true);

    // ✅ Hide popup after 2 seconds and redirect to login
    setTimeout(() => {
      setShowPopup(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="auth-container">
      {/* Left Image */}
      <div className="auth-image">
        <img src={signupImg} alt="Signup" />
      </div>

      {/* Right Form */}
      <div className="auth-form">
        <div className="form-card">
          <h2>Create an account</h2>
          <p>Enter your details below to create your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

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

            <button type="submit" className="btn-primary">Sign Up</button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>

      {/* ✅ Popup message */}
      {showPopup && (
        <div className="popup-msg">
          🎉 Successfully Registered! Redirecting to login...
        </div>
      )}
    </div>
  );
}
