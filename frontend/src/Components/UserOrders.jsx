import React, { useEffect, useState } from "react";
import axios from "axios";
import visa from "../assets/Images/visa.png";

export const UserOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/order/getOrders/${user.user._id}`
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    //fetchData();
  };

  console.log("orders", orders);

  return (
    <div>
      <h3>Order History</h3>

      {orders &&
        orders.map((order, index) => (
          <div
            className="AllOrders"
            style={{
              border: "0.5px solid gray",
              padding: "3px",
              borderRadius: "15px",
              margin: "8px",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: " 0 10px",
              }}
            >
              <p style={{ fontSize: "12px" }}>
                {" "}
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "13px" }}>
                Total Payment : Rs{order.totalPrice}.00
              </p>
            </div>

            <hr />

            {order.product.map((product, index) => (
              <div
                className="order"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  maxHeight: "200px",
                }}
                key={index} // Don't forget to add a unique "key" prop
              >
                <img
                  src={product.productImage}
                  alt=""
                  width={"100px"}
                  height={"100px"}
                />

                <div
                  className="details"
                  style={{
                    maxWidth: "35%",

                    padding: "5px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    {product.productTile}
                  </label>
                  <label htmlFor="">Size {product.size}</label>
                  <label htmlFor="" style={{ fontSize: "18px" }}>
                    Rs {product.productPrice}*{" "}
                    <span style={{ color: "black" }}>{product.quantity}</span>
                  </label>
                </div>

                <div
                  className="buttons"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "20%",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      width: "90%",
                      border: "1px solid black",
                      borderRadius: "8px",
                    }}
                  >
                    Confirm Delivery
                  </button>
                  <button
                    style={{
                      width: "90%",
                      border: "1px solid black",
                      borderRadius: "8px",
                    }}
                  >
                    Order Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      {orders == "" && <p>You Haven't order anything yet</p>}
    </div>
  );
};
