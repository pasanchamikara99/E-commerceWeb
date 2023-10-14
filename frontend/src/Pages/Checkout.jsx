import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Checkout.css";
import axios from "axios";
import Swal from "sweetalert2";

export const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [firstname, setFirstname] = useState(user.user.firstname);
  const [address, setAddress] = useState("");
  const [distirct, setdistrct] = useState("");
  const [city, setCity] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState(user.user.email);
  const [textArea, setTextArea] = useState("");
  const userID = user.user._id;
  const [items, setItems] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/cart/getCart/${user.user._id}`
      );
      setData(response.data.carts);

      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    //fetchData();
  };

  let totalPrice = 0;

  data.map((item) => {
    totalPrice = totalPrice + item.productPrice * item.quantity;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/order/addOrder`,
        {
          userID,
          firstname,
          address,
          distirct,
          city,
          mobilenumber,
          email,
          data,
          totalPrice,
        }
      );

      if (response.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Place Order Complated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <form action="" onSubmit={handleSubmit}>
        <div className="checkout">
          <div className="details">
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Street Address"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="District "
              required
              onChange={(e) => setdistrct(e.target.value)}
              value={distirct}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="City "
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="mobile number "
              required
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobilenumber}
            />{" "}
            <br />
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />{" "}
            <br />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => setTextArea(e.target.value)}
              value={textArea}
            ></textarea>
          </div>

          <div className="payment" style={{ backgroundColor: "#b4b8b5" }}>
            <label style={{ fontSize: "20px", fontWeight: "bold" }}>
              Order Summary
            </label>
            <table>
              <tr>
                <th>Product</th>
                <th>SubTotal</th>
              </tr>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.productTile} * {item.quantity}
                  </td>
                  <td>Rs {item.productPrice * item.quantity}.00</td>
                </tr>
              ))}

              <tr>
                <td>Delivery</td>
                <td>Free</td>
              </tr>

              <tr>
                <td>Total</td>
                <td>Rs {totalPrice}.00</td>
              </tr>
            </table>

            <div className="cardPayment">
              <input type="text" /> <br />
              <input type="text" />
              <input type="text" />
            </div>

            <button>Place Order</button>
          </div>
        </div>
      </form>
    </div>
  );
};
