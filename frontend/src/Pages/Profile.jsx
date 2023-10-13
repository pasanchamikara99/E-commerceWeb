import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";
import "./SingleProduct.css";
import { EditAccount } from "../Components/EditAccount";
import { EditAddress } from "../Components/EditAddress";
import { SignOut } from "../Hooks/UseSignOut";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [page, setPage] = useState(1);

  const { signout } = SignOut();

  const navigate = useNavigate();

  const handleClick = (index) => {
    setPage(index);
  };

  const logout = async () => {
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
              <button onClick={() => handleClick(1)}>My Orders</button>
            </li>

            <li>
              <button onClick={() => handleClick(2)}>Edit Address</button>
            </li>

            <li>
              <button onClick={() => handleClick(3)}>Edit Account</button>
            </li>

            <li>
              <button onClick={() => logout()}>Log Out</button>
            </li>
          </ul>
        </div>

        <div
          className="items"
          style={{
            backgroundColor: "red",
            padding: "10px",
            width: "100%",
          }}
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
