import React from "react";
import Navbar from "../Components/Navbar";

import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
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
          Login
        </h2>

        <input type="text" placeholder="Email/Mobile Number" />
        <input type="password" placeholder="Password" />
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
    </div>
  );
};
