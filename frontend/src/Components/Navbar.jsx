import React, { useContext, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Badge, Button } from "@mui/material";
import { FaPlus, FaWindowClose, FaUpload } from "react-icons/fa";
import Modal from "react-modal";

import Swal from "sweetalert2";
import { SignOut } from "../Hooks/UseSignOut";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { logout } = SignOut();

  const navigate = useNavigate();

  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Sign Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    marginLeft: "10px",
    borderRadius: "5px",
  };

  const cartClick = () => {
    console.log("cartClick");
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "10px", // Adjust top position as needed
      right: "10px", // Adjust right position as needed
      left: "auto",
      bottom: "auto",
      transform: "none",
      backgroundColor: "black",
      transition: "right 0.5s ease",
      zIndex: 9999,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <b>
            Cool Planet.com{" "}
            {user && user.user.userType == "admin" ? <b>Admin</b> : <></>}{" "}
          </b>
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
        {user && user.user.userType == "user" ? (
          <div
            className="right"
            style={{
              width: "15%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div className="profile">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <PersonSharpIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                />
                <b>{user && user.user.firstname}</b>
              </Link>
            </div>

            <div className="cart" onClick={openModal}>
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

              <label htmlFor="" style={{ fontSize: "13px" }}>
                <b>Rs 1000.00</b>
              </label>
            </div>
          </div>
        ) : user && user.user.userType === "admin" ? (
          <Button style={buttonStyle} onClick={() => logOut()}>
            Logout
          </Button>
        ) : (
          user === null && (
            <div>
              <Link to="/login" style={buttonStyle}>
                Sign In
              </Link>

              <Link to="/register" style={buttonStyle}>
                Sign Up
              </Link>
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
        <label htmlFor="" style={{ color: "white" }}>
          Men's Collection
        </label>
        <span style={{ margin: "0 5px", color: "white" }}>|</span>
        <label style={{ color: "white" }}>Women's Collection</label>
        <span style={{ margin: "0 5px", color: "white" }}>|</span>
        <label style={{ color: "white" }}>Use Chatbot</label>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <FaWindowClose style={{ color: "white", fontSize: "40px" }} />
        </button>
        <div className="modal">
          <center>
            <label style={{ color: "white", fontSize: "30px" }}>Cart</label>
          </center>
          <form onSubmit={handleSubmit}>
            <input /> <br />
            <input /> <br />
            <input /> <br />
            <input /> <br />
            <input /> <br />
            <input /> <br />
            <center>
              <button
                style={{
                  color: "white",
                  padding: "8px",
                  width: "300px",
                  backgroundColor: "black",
                  border: "1px solid white",
                  fontSize: "15px",
                }}
              >
                Add Product
              </button>
            </center>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
