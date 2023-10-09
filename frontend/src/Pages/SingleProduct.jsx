import React from "react";
import Navbar from "../Components/Navbar";
import "./SingleProduct.css";
import { Button, buttonBaseClasses } from "@mui/material";

export const SingleProduct = () => {
  const sizes = ["XXL", "S", "M", "L", "XL"];

  return (
    <div>
      <Navbar />

      <div className="productcontainer">
        <div
          className="image"
          style={{
            backgroundColor: "red",
            minHeight: "500px",
            minWidth: "30%",
            border: "1px solid black",
          }}
        >
          <img src="" alt="Image" />
        </div>

        <div
          className="details"
          style={{
            minWidth: "40%",
            minHeight: "500px",
          }}
        >
          <h3>Moose Men’s Elegant Slim Fit Polo T-Shirt – Storm Gray</h3>

          <h4>Rs 2500 .00 </h4>

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
                  }}
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
              <button>-</button>
              <label>1</label>
              <button>+</button>
            </div>

            <div className="addToCart">
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
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
