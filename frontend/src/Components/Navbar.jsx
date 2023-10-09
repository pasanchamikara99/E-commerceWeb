import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Badge } from "@mui/material";
import "../index.css";
import { Login } from "./Modal/Login";
import { Home } from "../Pages/Home";

const Navbar = (props) => {
  const user = "user";

  const [openModal, setOpenModal] = useState(false);

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    marginLeft: "10px",
    borderRadius: "5px",
  };

  const clickLogin = () => {
    setOpenModal(true);
  };

  return (
    <div className="container">
      <div
        className="wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          alignItems: "center",
        }}
      >
        <div className="left" style={{ width: "15%" }}>
          <b>Cool Planet .com</b>
        </div>
        <div
          className="center"
          style={{ width: "40%", backgroundColor: "black" }}
        >
          <div
            className="search"
            style={{
              display: "flex",
              justifyItems: "",
            }}
          >
            <input
              type="text"
              placeholder="Search for products here"
              style={{
                padding: "10px",
                border: "0.5px solid gray",
                borderRadius: "8px",
                width: "100%",
              }}
            />
            <SearchIcon
              style={{
                color: "white",
                cursor: "pointer",
                backgroundColor: "black",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        {user == "user" ? (
          <div
            className="right"
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div className="profile">
              <PersonSharpIcon
                style={{ fontSize: "30px", cursor: "pointer" }}
              />

              <b>Pasan</b>
            </div>

            <div className="cart">
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "black",
                  }}
                />
              </Badge>
              <br />
            </div>
          </div>
        ) : user === "admin" ? (
          <p>admin</p>
        ) : (
          user == "" && (
            <div>
              <button onClick={clickLogin} style={{ ...buttonStyle }}>
                Login
              </button>{" "}
              <button style={{ ...buttonStyle }}> Register</button>
            </div>
          )
        )}
      </div>

      <div
        className="navigation"
        style={{
          backgroundColor: "black",
          height: "25px",
          padding: "8px",
          margin: "5px",
        }}
      >
        <label htmlFor="">Men's Collection</label>
        <span style={{ margin: "0 5px" }}>|</span>
        <label htmlFor="">Women's Collection</label>
        <span style={{ margin: "0 5px" }}>|</span>
        <label htmlFor="">Use Chatbot</label>
      </div>
    </div>
  );
};

export default Navbar;
