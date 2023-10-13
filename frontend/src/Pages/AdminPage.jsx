import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { EditAccount } from "../Components/EditAccount";
import { EditAddress } from "../Components/EditAddress";
import "../Pages/SingleProduct.css";
import { AdminUserPage } from "../Components/Admin/AdminUserPage";
import { AdminProduct } from "../Components/Admin/AdminProduct";

export const AdminPage = () => {
  const [page, setPage] = useState(1);

  const handleClick = (index) => {
    setPage(index);
  };

  return (
    <div>
      <Navbar />

      <div
        className="profilecontainer"
        style={{ margin: "2rem", display: "flex" }}
      >
        <div className="profile">
          <center>
            <img src=".alie" alt="image" />
            <br />
            <label style={{ fontSize: "20px" }}>Pasan</label> <br />
            <label style={{ fontSize: "13px" }}>
              pasasnchamikara989@gmail.com
            </label>
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
              <button onClick={() => logout()}>Log Out</button>
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
            <AdminUserPage />
          ) : (
            <AdminProduct />
          )}
        </div>
      </div>
    </div>
  );
};
