import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export const SingleProduct = () => {
  const sizes = ["XXL", "S", "M", "L", "XL"];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const producId = useParams();
  const id = producId.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/getOneProduct/${id}`
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (id) => {
    const productID = id;

    console.log(productID);
    console.log(quantity);
    console.log(selectedSize);

    if (selectedSize != null) {
      setError("");
      try {
        const response = await axios
          .post(
            `http://localhost:4000/api/v1/cart/addProduct/${user.user._id}`,
            {
              productID,
              quantity,
              selectedSize,
            }
          )
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
    } else {
      setError("Please Select Size");
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const descreseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increseQty = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <Navbar />

      <div className="productcontainer">
        <div
          className="image"
          style={{
            minHeight: "500px",
            maxWidth: "30%",
          }}
        >
          <img
            src={data.imageLink}
            alt="Image"
            style={{ maxWidth: "400px", height: "600px" }}
          />
        </div>

        <div
          className="details"
          style={{
            maxWidth: "40%",
            minHeight: "500px",
            padding: "40px",
          }}
        >
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              textAlign: "center",
              padding: "3px",
            }}
          >
            {error}
          </p>
          <h3>{data.title}</h3>

          <h4>Rs {data.price}</h4>

          <label htmlFor="">About the fabric</label>
          <ul>
            <li>Fabric composition: 95% Cotton 5% Spandex</li>
            <li>Fabric pattern: Solid</li>
          </ul>

          <label>Add-on Features</label>
          <ul>
            <li>Fit type: Slim Fit</li>
            <li>Length: Regular</li>
            <li>EMB logo</li>
            <li>Neck tape at neck circumference</li>
          </ul>

          <label htmlFor="">
            Please bear in mind that the photo may be slightly different from
            the actual item in terms of color due to lighting conditions or the
            display used to view.
          </label>
          <br />
          <br />

          <div style={{ display: "flex", flexDirection: "row" }}>
            {sizes.map((size, index) => (
              <div key={index}>
                <Button
                  style={{
                    color: "black",
                    border: "1px solid gray",
                    margin: "2px",
                    backgroundColor:
                      selectedSize === size ? "lightblue" : "transparent",
                  }}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </Button>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="button">
              <button onClick={descreseQty}>-</button>
              <label>{quantity}</label>
              <button onClick={increseQty}>+</button>
            </div>

            <div className="addToCart">
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                onClick={() => addToCart(data._id)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
