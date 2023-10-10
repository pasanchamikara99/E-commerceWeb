import React, { useState } from "react";
import Navbar from "../Components/Navbar";

import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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

      <form onSubmit={handleSubmit}>
        <div className="login">
          <h2
            style={{
              fontWeight: "bolder",
              fontSize: "35px",
            }}
          >
            Login
          </h2>

          <input
            type="text"
            placeholder="Email"
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
          <button>LOGIN</button>

          <label style={{ fontSize: "15px" }}>Don't have an account ?</label>
          <button>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              SIGN UP
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};
