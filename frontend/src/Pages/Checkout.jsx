import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Checkout.css";
import axios from "axios";
import Swal from "sweetalert2";
import visa from "../assets/Images/visa.png";
import msCard from "../assets/Images/mscard.png";

export const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [firstname, setFirstname] = useState(user.user.firstname);
  const [address, setAddress] = useState(user.user.streetAddress);
  const [distirct, setdistrct] = useState(user.user.district);
  const [city, setCity] = useState(user.user.city);
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState(user.user.email);
  const [textArea, setTextArea] = useState("");
  const userID = user.user._id;
  const [items, setItems] = useState([]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const handleRadioChange = (e) => {
    setIsButtonEnabled(false);
  };

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
              placeholder="  Message For Delivey"
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

            <center>
              <div className="cardPayment">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id=""
                    value="visa"
                    onChange={handleRadioChange}
                    style={{ marginRight: "10px" }}
                  />
                  <img src={visa} alt="" srcSet="" width="70px" height="60px" />

                  <input
                    type="radio"
                    name="paymentMethod"
                    id=""
                    value="mastercard"
                    onChange={handleRadioChange}
                    style={{ marginRight: "10px" }}
                  />
                  <img
                    src={msCard}
                    alt=""
                    srcSet=""
                    width="70px"
                    height="40px"
                  />
                </div>
                {!isButtonEnabled && (
                  <>
                    <input
                      type="text"
                      style={{
                        width: "90%",
                        padding: "7px",
                        textAlign: "center",
                        fontSize: "15px",
                        border: "none",
                        marginBottom: "2px",
                      }}
                      placeholder="Name on Card"
                      required
                    />
                    <input
                      type="text"
                      style={{
                        width: "90%",
                        padding: "7px",
                        textAlign: "center",
                        fontSize: "18px",
                        border: "none",
                      }}
                      placeholder="xxxx xxxx xxxx xxxx"
                      required
                    />

                    <input
                      type="number"
                      style={{
                        padding: "6px",
                        textAlign: "center",
                        fontSize: "15px",
                        border: "none",
                        marginTop: "2px",
                        marginRight: "15px",
                      }}
                      placeholder="CVC"
                      required
                    />
                    <select
                      name=""
                      id=""
                      style={{ padding: "6px", border: "none", margin: "2px" }}
                    >
                      Month
                      <option value="">month</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                    </select>
                    <select
                      name=""
                      id=""
                      style={{ padding: "6px", border: "none" }}
                    >
                      Year
                      <option value="">year</option>
                      <option value="">2019</option>
                      <option value="">2021</option>
                      <option value="">2022</option>
                      <option value="">2023</option>
                    </select>
                  </>
                )}
              </div>
            </center>

            <button
              disabled={isButtonEnabled}
              style={{
                backgroundColor: isButtonEnabled ? "white" : "black",
                color: isButtonEnabled ? "gray" : "white",
                marginTop: "10px",
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
