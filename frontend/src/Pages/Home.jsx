import React, { useState } from "react";
import Navbar from "../Components/Navbar";

import one from "../assets/Images/one.png";
import { SliderImage } from "../Components/SliderImage";
import { Login } from "../Components/Modal/Login";

export const Home = (props) => {
  const [number, setNumber] = useState(props.name);

  const handleClick = () => {
    setNumber(number + 1);
  };

  return (
    <div>
      <Navbar number={number} />

      <SliderImage />

      {/* {number == true ? <Login name={true} /> : <p></p>} */}
    </div>
  );
};
