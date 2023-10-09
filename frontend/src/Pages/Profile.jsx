import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import { EditAccount } from "../Components/EditAccount";
import { EditAddress } from "../Components/EditAddress";

export const Profile = () => {
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

          <ol>
            <li>
              <button onClick={() => handleClick(1)}>My Orders</button>
            </li>

            <li>
              <button onClick={() => handleClick(2)}>Edit Address</button>
            </li>

            <li>
              <button onClick={() => handleClick(3)}>Edit Account</button>
            </li>
          </ol>
        </div>

        <div
          className="items"
          style={{ backgroundColor: "red", padding: "10px" }}
        >
          {page === 1 ? (
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis distinctio quasi consectetur? Facere facilis
              necessitatibus corporis sed, aperiam aliquid quisquam molestias,
              molestiae adipisci dicta est debitis! Enim quas perspiciatis
              saepe!
            </p>
          ) : page === 2 ? (
            <EditAccount />
          ) : (
            <EditAddress />
          )}
        </div>
      </div>
    </div>
  );
};
