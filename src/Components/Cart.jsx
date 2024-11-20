import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!cart.items) return;
    const fetchCart = async () => {
      const response = await fetch(`https://dummyjson.com/products/`);
      const data = await response.json();
      const filteredData = data.products.filter((product) => {
        return Object.keys(cart.items).includes(product.id.toString());
      });
      setProducts(filteredData);
    };
    fetchCart();
  }, [cart]);

  const getQty = (id) => {
    return cart.items[id];
  };
  let total = 0;
  const price = (product) => {
    total += getQty(product.id) * product.price;
    return getQty(product.id) * product.price;
  };

  const incrementCart = (product) => {
    const _cart = { ...cart }
    if (_cart.items[product.id]) {
      _cart.items[product.id] += 1
      _cart.total += 1
    }
    setCart(_cart)
  }

  const decrementCart = (product) => {
    const _cart = { ...cart };
    if (_cart.items[product.id] > 1) {
      _cart.items[product.id] -= 1;
      _cart.total -= 1;
    }
    setCart(_cart);
  }
  
  const deleteCart = (product) => {
    const _cart = { ...cart };
    if (_cart.items[product.id]) {
      _cart.total -= _cart.items[product.id];
      delete _cart.items[product.id]
    }
    setCart(_cart);
  }

  return (
    <section className="container mx-auto py-8">
      {!products.length ? (
        <h1>No products add</h1>
      ) : (
        <ul className="w-2/4 mx-auto">
          {products.map((product) => (
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
                {getQty(product.id) || 0}
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
              Total price: $<span className="font-semibold">{total}</span>
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
