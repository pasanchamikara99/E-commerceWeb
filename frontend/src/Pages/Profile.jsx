import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div>
      <Navbar />

      <div className="profilecontainer">
        <div className="profile">
          <img src="" alt="" />
          <label htmlFor="">Pasan</label>
          <label htmlFor="">pasasnchamikara989@gmail.com</label>

          <Link to="/myOrders">My Orders</Link>
          <Link to="/myOrders">Edit Address</Link>
          <Link to="/myOrders">Edit Account</Link>
        </div>
      </div>
    </div>
  );
};
