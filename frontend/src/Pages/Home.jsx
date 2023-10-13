import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { SliderImage } from "../Components/SliderImage";
import "../Components/SliderImage.css";
import { Link } from "@mui/material";

export const Home = (props) => {
  const [number, setNumber] = useState(props.name);

  return (
    <div>
      <Navbar style={{ zIndex: "100" }} />

      <SliderImage style={{ zIndex: "0" }} />

      <div className="sectionOne">
        <label htmlFor="">
          <Link to="#">New Products</Link>
        </label>
        <label htmlFor="">
          <Link to="">New Products</Link>
        </label>
      </div>
    </div>
  );
};
