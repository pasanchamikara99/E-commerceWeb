import React, { useState } from "react";
import Navbar from "../Components/Navbar";

import "./Login.css";
import { Link } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();

    // Check if there are no errors
    if (!Object.values(errors).some((error) => error !== "")) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="login">
        <h2
          style={{
            fontWeight: "bolder",
            fontSize: "35px",
          }}
        >
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.username}
            name="username"
            onChange={handleInputChange}
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <input
            type="text"
            placeholder="Email "
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <button type="submit">Register</button>
          <br />
          <label style={{ fontSize: "15px" }}>Already Registered ?</label>
          <button>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              LOGIN
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};
