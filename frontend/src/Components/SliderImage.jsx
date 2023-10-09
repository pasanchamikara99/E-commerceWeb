import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

import imageOne from "../assets/Images/one.jpg";
import imageTwo from "../assets/Images/two.jpg";
import imageThree from "../assets/Images/three.jpg";

import "../Components/SliderImage.css";

export const SliderImage = () => {
  const itemsArray = [
    {
      imageSrc: imageOne,
      text: "Discover the Latest Trends",
      style: {
        backgroundColor: "lightblue",
        color: "black",
        fontSize: "50px",
        padding: "10px",
      },
    },
    {
      imageSrc: imageTwo,
      text: "Item 2",
      style: {
        backgroundColor: "lightgreen",
        color: "black",
        fontSize: "50px",
        padding: "10px",
      },
    },
    {
      imageSrc: imageThree,
      text: "Item 3",
      style: {
        backgroundColor: "lightcoral",
        color: "white",
        fontSize: "50px",
        padding: "10px",
      },
    },
  ];

  return (
    <>
      <div className="slide-container">
        <Fade>
          {itemsArray.map((item, index) => (
            <div className="slider" key={index} style={item.style}>
              <div>
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 style={item.style}>{item.text}</h2>
                  <img
                    src={item.imageSrc}
                    alt={`Item ${index + 1}`}
                    style={{ height: "500px" }}
                  />
                </div>
                <button
                  style={{
                    padding: "20px",
                    border: "2px solid black",
                    fontSize: "20px",
                    backgroundColor: "transparent",
                    marginLeft: "20px",
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </Fade>
      </div>

      <br />
      <div
        className="details-container"
        style={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          alignItems: "center",
          height: "80px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="left">
          <img src="../assets/Images/Delivery.png" alt="delivery" />
          <label htmlFor="" style={{ fontWeight: "bold" }}>
            Free Shipping{" "}
          </label>
          <label htmlFor="">
            Delivered to your doorstep at no additional cost
          </label>
        </div>
        <div className="left">
          {" "}
          <img src="../assets/Images/Delivery.png" alt="delivery" />
          <label htmlFor="" style={{ fontWeight: "bold" }}>
            Returns And Exchange Available{" "}
          </label>
          <label htmlFor="">
            Don’t like it? We do exchanges within 7 days!
          </label>
        </div>
        <div className="left">
          {" "}
          <img src="../assets/Images/Delivery.png" alt="delivery" />
          <label htmlFor="" style={{ fontWeight: "bold" }}>
            Guarantee of Comfort and Quality
          </label>
          <label htmlFor="">
            Wear confidence, comfort and quality. Made to fit you!
          </label>
        </div>
      </div>
    </>
  );
};
