import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const { products } = await response.json();
      const filterProduct = products.filter((product) => {
        return Object.keys(cart.items).includes(product.id.toString());
      });
      setCartProducts(filterProduct);
    };
    fetchData();
  }, [cart]);

  const getQuantity = (product) => {
    return cart.items[product.id];
  };

  let totalPrice = 0;
  const price = (product) => {
    totalPrice += getQuantity(product) * product.price;
    return getQuantity(product) * product.price;
  };

  const incrementCart = (product) => {
    const _cart = { ...cart };
    if (_cart.items[product.id] < 4) {
      _cart.items[product.id] += 1;
      _cart.total += 1;
    } else {
      toast.error("You can add maximum 4 of each item!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setCart(_cart);
  };
  const decrementCart = (product) => {
    const _cart = { ...cart };
    if (_cart.items[product.id] > 1) {
      _cart.items[product.id] -= 1;
      _cart.total -= 1;
    }
    setCart(_cart);
  };
  const deleteCart = (product) => {
    const _cart = { ...cart };
    _cart.total -= _cart.items[product.id];
    delete _cart.items[product.id];
    toast.info(`${product.title} removed successfully!`, {
      position: "top-right",
      autoClose: 2000,
    });
    setCart(_cart);
  };

  return (
    <section className="container mx-auto py-16">
      {!cartProducts.length ? (
        <h1>No product added!</h1>
      ) : (
        <ul className="w-2/4 mx-auto">
          {cartProducts.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between mb-4"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 border border-indigo-400 rounded-md"
              />
              <button
                onClick={() => decrementCart(product)}
                className="bg-green-500 hover:bg-green-400 text-white px-4 rounded font-bold text-[18px]"
              >
                -
              </button>
              <span className="text-[19px] font-semibold">
                {getQuantity(product) || 0}
              </span>
              <button
                onClick={() => incrementCart(product)}
                className="bg-green-500 hover:bg-green-400 text-white px-4 rounded font-bold text-[18px]"
              >
                +
              </button>
              <span className="text-[19px] font-semibold">
                ${price(product) || 0}
              </span>
              <button
                onClick={() => deleteCart(product)}
                className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}

          {/*  */}
          <hr className="mb-4" />
          <div className="text-right">
            <p className="text-xl mb-1">
              Total price: $<span className="font-semibold">{totalPrice}</span>
            </p>
            <button className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-2 rounded">
              Order now
            </button>
          </div>
        </ul>
      )}
    </section>
  );
};
export default Cart;
