import React from "react";
import Navbar from "../Components/Navbar";

import "./Login.css";
import { Link } from "react-router-dom";

export const Register = () => {
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

        <input type="text" placeholder="Enter your name" />
        <input type="text" placeholder="Email/Mobile Number" />
        <input type="password" placeholder="Password" />
        <button>Register</button>

        <label style={{ fontSize: "15px" }}>Already Registered ?</label>
        <button>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            LOGIN
          </Link>
        </button>
      </div>
    </div>
  );
};
