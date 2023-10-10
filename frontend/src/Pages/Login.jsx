import React, { useState } from "react";
import Navbar from "../Components/Navbar";

import "./Login.css";
import { Link } from "react-router-dom";
import { useLogin } from "../Hooks/UseLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
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

          {error && <div className="error">{error}</div>}
          <input
            type="text"
            placeholder="Email"
            name="email"
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
