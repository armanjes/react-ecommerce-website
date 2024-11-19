import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {cart} = useContext(CartContext)

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              MyLogo
            </Link>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link to="/cart" className="hover:text-gray-300 flex gap-1">
              <span>{cart.totalItems}</span>
              <IoCartOutline size={24} />
            </Link>
            <Link to="/profile" className="hover:text-gray-300">
              <CiUser size={24} />
            </Link>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-gray-700">
            Products
          </Link>
          <Link to="/cart" className="flex hover:text-gray-300">
            <span className="ms-4">{cart.totalItems}</span>
            <IoCartOutline size={24} />
          </Link>
          <Link to="/profile" className="hover:text-gray-300">
            <CiUser size={24} className="ms-4" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
