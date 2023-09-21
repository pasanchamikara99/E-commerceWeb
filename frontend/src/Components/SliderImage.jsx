import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";

import imageOne from "../assets/Images/one.png";
import imageTwo from "../assets/Images/two.png";
import imageThree from "../assets/Images/three.png";

export const SliderImage = () => {
  const images = [imageOne, imageTwo, imageThree];

  images.map((image, index) => console.log(image));

  return (
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
                  border: "none",
                  fontSize: "20px",
                  borderRadius: "6px",
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
