import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./Pages/Home";
import { LoginModal } from "./Context/LoginModal";
import { useState } from "react";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { SingleProduct } from "./Pages/SingleProduct";
import { Profile } from "./Pages/Profile";
import { AdminPage } from "./Pages/AdminPage";
import { Footer } from "./Components/Footer";
import {FooterNew } from "./Components/FooterNew";
import { Checkout } from "./Pages/Checkout";
import { AllProduct } from "./Pages/AllProduct";

function App() {
  const [clickLogin, setClickLogin] = useState(false);

  return (
    <LoginModal.Provider value={{ clickLogin, setClickLogin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </LoginModal.Provider>
  );
}

export default App;
