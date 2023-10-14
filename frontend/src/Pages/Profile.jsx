import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";
import Modal from "react-modal";
import "./SingleProduct.css";
import { ViewFeedBacks } from "../Components/ViewFeedBacks";
import { EditAddress } from "../Components/EditAddress";
import { SignOut } from "../Hooks/UseSignOut";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaWindowClose, FaUpload } from "react-icons/fa";
import { UserOrders } from "../Components/UserOrders";
import profile from "../assets/Images/profile.png";

export const Profile = () => {
  const [page, setPage] = useState(1);
  const [prePassword, setPrePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const { signout } = SignOut();

  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // await login(email, password);

    console.log("Product title ", productTitle);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
    },
  };

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
        style={{ margin: "2rem", display: "flex", minHeight: "600px" }}
      >
        <div className="profile">
          <center>
            <img src={profile} alt="no" width={"150px"} />
            <br />
            <br />
            <label style={{ fontSize: "20px" }}>
              {user.user.firstname}
            </label>{" "}
            <br />
            <label style={{ fontSize: "13px" }}>{user.user.email}</label>
          </center>

          <ul>
            <li>
              <button onClick={() => handleClick(1)}>My Orders</button>
            </li>
            <li>
              <button onClick={() => handleClick(2)}>My Feedbacks</button>
            </li>

            <li>
              <button onClick={() => handleClick(3)}>Shipping Address</button>
            </li>

            <li>
              <button onClick={openModal}>Change Password</button>
            </li>

            <li>
              <button onClick={() => logout()}>Log Out</button>
            </li>
          </ul>
        </div>

        <div
          className="items"
          style={{
            // backgroundColor: "red",
            padding: "10px",
            width: "100%",
          }}
        >
          {page === 1 ? (
            <UserOrders />
          ) : page === 3 ? (
            <EditAddress />
          ) : (
            <ViewFeedBacks />
          )}
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
              <label style={{ color: "white", fontSize: "30px" }}>
                Change Password
              </label>
            </center>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Previous Password"
                onChange={(e) => setPrePassword(e.target.value)}
                value={prePassword}
              />{" "}
              <br />
              <input
                type="text"
                placeholder="Enter New Password "
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <br />
              <input
                type="text"
                placeholder="Confirm New Password "
                onChange={(e) => setConfrimPassword(e.target.value)}
                value={confirmPassword}
              />
              <br />
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
    </div>
  );
};
