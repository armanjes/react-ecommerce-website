import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Nav";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Cart from "./Components/Cart.Jsx";
import { CartContext } from "./CartContext";
import { useState } from "react";
import User from "./Components/User";

const App = () => {
  const [cart, setCart] = useState({});

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<User />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
};
export default App;
