import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const EditAddress = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [streetAddress, setStreetAddress] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/user/editAddress/${user.user._id}`,
        {
          streetAddress,
          city,
          district,
        }
      );

      console.log(response);
      if (response.status == 200) {
        Swal.fire("Updated!", "Address  has been Updated.", "success");
      }
    } catch (error) {
      error.message;
    }
  };
  return (
    <div>
      <h2>Add Shipping Address</h2>

      <br />
      <div className="editForm">
        <form onSubmit={handleSubmit}>
          {/* {error && <div className="error">{error}</div>} */}
          <label>Street Address</label> <br />
          <input
            type="text"
            onChange={(e) => setStreetAddress(e.target.value)}
            value={streetAddress}
          />
          <br />
          <label>District</label> <br />
          <input
            type="text"
            id=""
            name="district"
            onChange={(e) => setdistrict(e.target.value)}
            value={district}
          />{" "}
          <br />
          <label>City</label> <br />
          <input
            type="text"
            name="city"
            id=""
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
