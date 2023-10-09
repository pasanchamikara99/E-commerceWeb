import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

import imageOne from "../assets/Images/one.png";
import imageTwo from "../assets/Images/two.png";
import imageThree from "../assets/Images/three.png";

import "../Components/SliderImage.css";

export const SliderImage = () => {
  const images = [imageOne, imageTwo, imageThree];

  images.map((image, index) => console.log(image));

  return (
    <>
      <div className="slide-container">
        <Fade>
          {images.map((image, index) => (
            <div className="slider" key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                  backgroundSize: "cover",
                  backgroundImage: `url(${image})`,
                }}
              >
                <button
                  style={{
                    padding: "20px",
                    border: "2px solid black",
                    fontSize: "20px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
