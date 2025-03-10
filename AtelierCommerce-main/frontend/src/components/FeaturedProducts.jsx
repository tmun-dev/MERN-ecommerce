import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { ShoppingCart, Eye } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { products } = useProductStore();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const featuredProducts = products?.filter((product) => product.isFeatured);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-playfair text-[#0f2810] font-light mb-2">
            Featured Timepieces
          </h2>
          <p className="text-[#0f2810]/70">
            Discover our specially curated collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts?.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col overflow-hidden rounded-lg border border-[#9ca]/20 bg-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="group aspect-[6/6] overflow-hidden relative">
                  <img
                    src={`data:${product.imageType};base64,${product.image}`}
                    alt={product.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#0f2810]/0 group-hover:bg-[#0f2810]/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300 text-white flex flex-col items-center">
                      <Eye className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Click to view</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair text-[#0f2810] mb-2">
                    {product.brand}
                  </h3>
                  <p className="text-[#0f2810]/80 mb-4">{product.model}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light font-playfair text-[#0f2810]">
                      ${product.price}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="flex items-center justify-center rounded-md bg-[#0f2810] px-4 py-2 text-sm 
                        font-medium text-white hover:bg-[#1a3a1a] transition duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
