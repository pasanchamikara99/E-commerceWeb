import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../Pages/SingleProduct.css";
import { AdminUserPage } from "../Components/Admin/AdminUserPage";
import { AdminProduct } from "../Components/Admin/AdminProduct";
import { AdminOrderPage } from "../Components/Admin/AdminOrderPage";
import "./adminPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import propic from "../assets/Images/propic.png";

export const AdminPage = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = (index) => {
    setPage(index);
  };

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

  return (
    <div className="adminDashboard">
      <Navbar />

      <div
        className="profilecontainer"
        style={{ margin: "2rem", display: "flex" }}
      >
        <div className="profile">
          <center>
            <img
              src={propic}
              alt="image"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <br />
            <label style={{ fontSize: "20px" }}>
              {user.user.firstname}
            </label>{" "}
            <br />
            <label style={{ fontSize: "13px" }}>{user.user.email}</label> <br />
            <label style={{ fontSize: "13px" }}>{user.user.userType}</label>
          </center>

          <ul>
            <li>
              <button onClick={() => handleClick(1)}> User Management</button>
            </li>

            <li>
              <button onClick={() => handleClick(2)}>Order Management</button>
            </li>

            <li>
              <button onClick={() => handleClick(3)}>Product Management</button>
            </li>

            <li>
              <button onClick={() => logOut()}>Log Out</button>
            </li>
          </ul>
        </div>

        <div
          className="items"
          style={{ padding: "10px", width: "100%", marginLeft: "3rem" }}
        >
          {page === 1 ? (
            <AdminUserPage />
          ) : page === 2 ? (
            <AdminOrderPage />
          ) : (
            <AdminProduct />
          )}
        </div>
      </div>
    </div>
  );
};
