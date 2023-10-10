import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSignup } from "../Hooks/UseSignUp";

import "./Login.css";
import { Link } from "react-router-dom";

export const Register = () => {
  const [firstname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const [userType, setType] = useState("user");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(firstname, userType, email, password);
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
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setfName(e.target.value)}
            value={firstname}
          />

          <input
            type="text"
            placeholder="Email "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

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
