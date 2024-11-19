import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  // useEffect(() => {
  //   if (!cart.items) {
  //     console.log("dlsf");
  //     return;
  //   }
  //   const fetchCartItem = async () => {
  //     try {
  //       const response = await fetch("https://dummyjson.com/products", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ ids: Object.keys(cart.items) }),
  //       });
  //       const cartProduct = await response.json();
  //       setCartList(cartProduct.products);
  //       console.log(cartProduct.products);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchCartItem();
  // }, [cart]);

  useEffect(() => {
    const fetchCartItem = async () => {
      if (!cart.items) return;

      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        // Convert product IDs to strings and filter
        const filteredProducts = data.products.filter((product) =>
          Object.keys(cart.items).includes(product.id.toString())
        );
        setCartList(filteredProducts);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchCartItem();
  }, [cart]);

  const incrementCart = (id) => {
    const _cart = { ...cart };
    _cart.items[id] = cart.items[id] + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrementCart = (id) => {
    const _cart = { ...cart };
    if (_cart.items[id] > 1) {
      _cart.items[id] = cart.items[id] - 1;
      _cart.totalItems -= 1;
    } else {
      delete _cart.items[id];
      _cart.totalItems -= 1;
    }
    setCart(_cart);
  };

  return (
    <section className="container mx-auto w-full px-1 md:w-3/5 pb-5">
      {!cartList.length ? (
        <div className="flex flex-col gap-3 items-center justify-center translate-y-24">
          <IoCartOutline size={74} />
          <h1 className="font-bold text-3xl">No product added</h1>
          <Link
            className="bg-orange-600 px-1 py-2 rounded font-bold text-white hover:bg-orange-500"
            to="/products"
          >
            Cart Products
          </Link>
        </div>
      ) : (
        <>
          <ul>
            {cartList.map((m) => {
              return (
                <>
                  <li
                    className="flex justify-between items-center mt-5"
                    key={m.id}
                  >
                    <div>
                      <img
                        className="h-24 border border-indigo-300 rounded-md"
                        src={m.thumbnail}
                        alt={m.title}
                      />
                    </div>
                    {/* Increment/Decrement Buttons */}
                    <div>
                      <button
                        onClick={() => decrementCart(m.id)}
                        className="bg-indigo-300 px-3 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{cart.items[m.id] || 0}</span>

                      <button
                        onClick={() => incrementCart(m.id)}
                        className="bg-indigo-300 px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                    {/* Price */}
                    <h3 className="font-semibold">
                      ${m.price * cart.items[m.id] || 0}
                    </h3>
                    <button className="bg-red-600 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
export default Cart;
