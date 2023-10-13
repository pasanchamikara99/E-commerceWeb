import React from "react";
import { FaPlus, FaWindowClose, FaUpload } from "react-icons/fa";
import "./UserStyles.css";

export const EditAccount = () => {
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(firstname, userType, email, password);
  };
  return (
    <div>
      <h2>Edit User Details</h2>
      <div className="editForm">
        <form onSubmit={handleSubmit}>
          {/* {error && <div className="error">{error}</div>} */}
          <label
            style={{
              display: "inline-block",
              border: "1px solid black",
              borderRadius: "150px",
              width: "150px",
              height: "100px",
            }}
          >
            <img src="" alt="Profile Image" srcset="" />
          </label>
          <label
            style={{
              display: "inline-block",
              border: "1px solid #ccc",
              cursor: "pointer",
              maxWidth: "150px",
              fontSize: "15px",
              color: "black",
            }}
          >
            <input type="file" style={{ display: "none" }} />
            <FaUpload style={{ color: "black" }} /> upload image
          </label>
          <br /> <br />
          <label>First Name</label> <br />
          <input
            type="text"
            // onChange={(e) => setfName(e.target.value)}
            // value={firstname}
          />
          <label>Address</label> <br />
          <input type="text" name="" id="" /> <br />
          <label>Mobile Number</label>
          <input type="text" name="" id="" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
