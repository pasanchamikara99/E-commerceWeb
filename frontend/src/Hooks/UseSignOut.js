import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  // Assuming you want to remove an item with a key 'myItem' from local storage

  const logout = async () => {
    localStorage.removeItem("user");
    const navigate = useNavigate();
    console.log("logged out");
    navigate("/");
  };

  return { logout };
};
