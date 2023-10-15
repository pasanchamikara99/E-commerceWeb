import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Badge, Button } from "@mui/material";
import { FaPlus, FaWindowClose, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";

import "./UserStyles.css";

import Swal from "sweetalert2";
import { SignOut } from "../Hooks/UseSignOut";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState(data.length);
  const [isDeleted, setIsDeleted] = useState(false);

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
      backgroundColor: "white",
      transition: "right 0.5s ease",
      zIndex: 9999,
    },
  };

  useEffect(() => {
    fetchData();

    setIsDeleted(false);
  }, [isDeleted]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/cart/getCart/${user.user._id}`
      );
      setData(response.data.carts);
      setCartItem(response.data.carts.length);
      setquantity();
      setLoading(false);

      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    //fetchData();
  };

  const [quantity, setquantity] = useState([]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setquantity(quantity + 1);
  };

  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = axios.delete(
            `http://localhost:4000/api/v1/cart/deletecart/${id}`
          );
          setIsDeleted(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const checkout = () => {
    navigate("/checkout");
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
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              CoolPlanet.com
            </Link>
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
              <Badge badgeContent={cartItem} color="primary">
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
        <label style={{ color: "white" }}>Use </label>
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
          <FaWindowClose style={{ color: "black", fontSize: "40px" }} />
        </button>
        <div className="modal">
          <center>
            <label style={{ color: "black", fontSize: "30px" }}>My Cart</label>
          </center>
          <div>
            {data.map((item) => (
              <div className="cartItem">
                <img
                  src={item.productImage}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />

                <div className="info">
                  <label style={{ fontSize: "15px", marginLeft: "10px" }}>
                    {item.productTile}
                  </label>
                  <div className="buttons">
                    <button onClick={decreaseQuantity}>-</button>
                    <label htmlFor="">{item.quantity}</label>
                    <button onClick={increaseQuantity}>+</button>
                  </div>

                  <label
                    htmlFor=""
                    style={{ fontSize: "13px", marginLeft: "20px" }}
                  >
                    <b>
                      {item.quantity} * Rs . {item.productPrice * item.quantity}
                    </b>
                  </label>
                </div>

                <button
                  style={{ backgroundColor: "none", border: "none" }}
                  onClick={() => deleteItem(item._id)}
                >
                  <FaTrash style={{ color: "red", fontSize: "15px" }} />
                </button>
              </div>
            ))}
            {data == "" && <p>Empty</p>}
            <center>
              <button
                style={{
                  color: data == "" ? "black" : "white",
                  padding: "8px",
                  width: "300px",
                  backgroundColor: data == "" ? "white" : "black",
                  border: "1px solid black",
                  fontSize: "15px",
                }}
                onClick={checkout}
                disabled={data == "" ? true : false}
              >
                Check Out
              </button>
            </center>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
