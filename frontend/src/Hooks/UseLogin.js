import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //save user local storage
      localStorage.setItem("user", JSON.stringify(json));

      setIsLoading(false);

      if (json.user.userType === "user") {
        navigate("/");
      } else if (json.user.userType === "admin") {
        navigate("/Admin");
      }
    }

    //console.log(json.user);
  };

  return { login, isLoading, error };
};
