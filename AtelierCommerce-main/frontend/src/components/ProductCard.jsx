import toast from "react-hot-toast";
import { ShoppingCart, Eye } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-[#9ca]/20 bg-white shadow-lg transition-all duration-200 hover:shadow-xl">
        <div className="group aspect-[6/6] overflow-hidden relative">
          <img
            src={`data:${product.imageType};base64,${product.image}`}
            alt={`${product.brand} ${product.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-[#0f2810]/0 group-hover:bg-[#0f2810]/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300 text-white flex flex-col items-center">
              <Eye className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Click to view</span>
            </div>
          </div>
        </div>

        <div className="mt-4 px-5 pb-5">
          <h2 className="text-xl font-playfair tracking-tight text-[#0f2810]">
            {product.brand}
          </h2>
          <h3 className="text-lg tracking-tight text-[#0f2810]/80">
            {product.model}
          </h3>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-2xl font-light font-playfair text-[#0f2810]">
                ${product.price}
              </span>
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center rounded-md bg-[#0f2810] px-5 py-2.5 text-center text-sm 
              font-medium text-white hover:bg-[#1a3a1a] transition duration-200 focus:outline-none focus:ring-2 
              focus:ring-[#9ca] focus:ring-offset-2"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
