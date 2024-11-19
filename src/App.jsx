import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Cart from "./Components/Cart.Jsx";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";

const App = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      // Avoid saving an empty cart on first render
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const saveCart = localStorage.getItem("cart");
    if (saveCart) {
      setCart(JSON.parse(saveCart));
    }
  }, []);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
};
export default App;
