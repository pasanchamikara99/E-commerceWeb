import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { SliderImage } from "../Components/SliderImage";
import "../Components/SliderImage.css";
import axios from "axios";
import { Link } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/getAllProduct"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (id) => {
    const productID = id;
    try {
      const response = await axios
        .post(`http://localhost:4000/api/v1/cart/addProduct/${user.user._id}`, {
          productID,
        })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar style={{ zIndex: "100" }} />

      {/* <SliderImage style={{ zIndex: "0" }} /> */}

      <div className="sectionOne">
        <label htmlFor="">
          <Link to="#">New Products</Link>
        </label>
        <label htmlFor="">
          <Link to="">New Products</Link>
        </label>
      </div>

      <div
        className="productList"
        style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}
      >
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {data.map((item, index) => (
              <div
                key={index} // Make sure to use a unique key for each element
                className="productCard"
                style={{
                  padding: "5px",
                  margin: "10px",
                  border: "1px solid black",
                  minWidth: "300px",
                  minHeight: "200px",
                }}
              >
                <img
                  src=""
                  alt="Product Image"
                  srcset=""
                  style={{ width: "50px" }}
                />
                <h1>{item.title}</h1>
                <center>
                  <label>Price : Rs.{item.price}.00</label>
                  <br />
                  <br />
                  <button
                    style={{ padding: "8px", width: "150px" }}
                    onClick={() => addToCart(item._id)}
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>
                </center>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
