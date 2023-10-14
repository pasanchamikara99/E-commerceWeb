import React from "react";
import { FaPlus, FaWindowClose, FaUpload } from "react-icons/fa";
import "./UserStyles.css";

export const EditAccount = () => {
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = axios.patch("", {});
  };
  return (
    <div>
      <br />
      <div className="editForm">
        <form onSubmit={handleSubmit}>
          {/* {error && <div className="error">{error}</div>} */}
          <label>Street Address</label> <br />
          <input
            type="text"
            // onChange={(e) => setfName(e.target.value)}
            // value={firstname}
          />
          <br />
          <label>District</label> <br />
          <input type="text" name="" id="" /> <br />
          <label>City</label> <br />
          <input type="text" name="" id="" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
