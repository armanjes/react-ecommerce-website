import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Products = () => {
  // fetching products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      setProducts(result.products);
    };
    fetchProducts();
  }, []);

  // adding product to cart
  const { cart, setCart } = useContext(CartContext);
  const addToCart = (product) => {
    const _cart = {...cart}
    if (!_cart.items) _cart.items = {}
    if (!_cart.items[product.id]) {
      _cart.items[product.id] = 1
    } else {
      _cart.items[product.id] += 1
    }
    if (!_cart.total) {
      _cart.total = 1
    } else {
      _cart.total += 1
    }
    setCart(_cart)
  }

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-5 gap-6 py-16">
        {products.map((product) => (
          <div key={product.id} className="border py-1 px-2 rounded">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <h4>{product.price}</h4>
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-2 rounded"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Products;
