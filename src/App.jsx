import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Cart from "./Components/Cart.Jsx";
import User from "./Components/User";
import { useState } from "react";
import { CartContext } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cart, setCart] = useState({
    items: {},
    total: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Navbar />
      <ToastContainer hideProgressBar={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<User />} />
      </Routes>
    </CartContext.Provider>
  );
};
export default App;
