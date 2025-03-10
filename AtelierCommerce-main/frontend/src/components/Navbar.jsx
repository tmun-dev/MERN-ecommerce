import {
  ShoppingCart,
  UserPlus,
  LogIn,
  Lock,
  LogOut,
  Package,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
// import { useEffect } from "react";
const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 border-b border-[#9ca]/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-center items-center">
          <Link
            to="/"
            className="text-2xl font-playfair text-[#0f2810] font-light items-center space-x-2 flex mr-8"
          >
            Atelier Amiri
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/"
              className="text-[#0f2810]/80 hover:text-[#0f2810] transition duration-200 px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/Products"
              className="text-[#0f2810]/80 hover:text-[#0f2810] transition duration-200 px-3 py-2"
            >
              Products
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-[#0f2810]/80 hover:text-[#0f2810] transition duration-200 px-3 py-2"
              >
                <ShoppingCart className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-2 bg-[#0f2810] text-white rounded-full px-2 py-0.5 text-xs">
                  {cart.length}
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/ad-min-dash-page"
                className="bg-[#0f2810] text-white px-4 py-2 rounded-md transition duration-200 
                  hover:bg-[#1a3a1a] flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/orders"
                className="bg-[#0f2810] text-white px-4 py-2 rounded-md transition duration-200 
                  hover:bg-[#1a3a1a] flex items-center"
              >
                <Package className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            )}
            {user ? (
              <button
                onClick={logout}
                className="bg-[#0f2810] text-white px-4 py-2 rounded-md transition duration-200 
                  hover:bg-[#1a3a1a] flex items-center"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-[#0f2810] text-white px-4 py-2 rounded-md transition duration-200 
                    hover:bg-[#1a3a1a] flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-[#0f2810] border border-[#9ca]/20 px-4 py-2 rounded-md 
                    transition duration-200 hover:bg-[#0f2810] hover:text-white flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/profile"
                className="text-[#0f2810]/80 hover:text-[#0f2810] transition duration-200 px-3 py-2"
              >
                <User />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
