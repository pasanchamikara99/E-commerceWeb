import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./Pages/Home";
import { LoginModal } from "./Context/LoginModal";
import { useState } from "react";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { SingleProduct } from "./Pages/SingleProduct";
import { Profile } from "./Pages/Profile";

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
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LoginModal.Provider>
  );
}

export default App;
