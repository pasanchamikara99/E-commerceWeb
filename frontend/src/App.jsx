import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Modal/Login";
import { Home } from "./Pages/Home";
import { LoginModal } from "./Context/LoginModal";
import { useState } from "react";

function App() {
  const [clickLogin, setClickLogin] = useState(false);

  return (
    <LoginModal.Provider value={{ clickLogin, setClickLogin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LoginModal.Provider>
  );
}

export default App;
