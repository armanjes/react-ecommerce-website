import { useContext, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "../CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let _cart = { ...cart };
    console.log(_cart);
    
    if (!_cart.items) _cart.items = {};
    if (!_cart.items[product.id]) {
      _cart.items[product.id] = 1;
    } else {
      _cart.items[product.id] += 1;
    }
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
  };

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {/* Product cards */}
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow-md hover:shadow-lg p-4 flex flex-col items-center"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover rounded"
          />
          <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-700 font-semibold mt-2">
            {product.brand}
          </span>
          <h3 className="font-medium text-lg mt-2">{product.title}</h3>
          <div className="flex justify-between items-center w-full mt-4">
            <em className="text-gray-700">${product.price}</em>
            <button
              onClick={() => addToCart(product)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <IoCartOutline size={24} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
