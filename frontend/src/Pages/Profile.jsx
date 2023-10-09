import React from "react";
import Navbar from "../Components/Navbar";

export const Profile = () => {
  return (
    <div>
      <Navbar />

      <div className="profilecontainer">
        <div className="profile">
          <img src="" alt="" />
          <label htmlFor="">Pasan</label>
          <label htmlFor="">pasasnchamikara989@gmail.com</label>

          <Link to="/myOrders"></Link>
        </div>
      </div>
    </div>
  );
};
