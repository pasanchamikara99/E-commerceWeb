import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const signup = async (firstname, userType, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        userType,
        email,
        password,
      }),
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
      } else if (json.user.type === "seller") {
        navigate("/seller");
      } else if (json.user.type === "admin") {
        navigate("/admin");
      }
    }

    console.log(json);
  };

  return { signup, isLoading, error };
};
