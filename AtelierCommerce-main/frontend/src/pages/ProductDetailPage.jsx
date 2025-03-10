import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProductStore();
  const { addToCart, cart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useUserStore();
  const product = products?.find((p) => p._id === id);
  const isInCart = cart.some((item) => item._id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-20 px-4">
        <div className="text-center text-[#0f2810]">Product not found</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    if (!isInCart) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square overflow-hidden rounded-lg border border-[#9ca]/20">
              <img
                src={`data:${product.imageType};base64,${product.image}`}
                alt={`${product.brand} ${product.model}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h1 className="text-3xl font-playfair text-[#0f2810] font-light mb-2">
                {product.brand}
              </h1>
              <p className="text-xl text-[#0f2810]/80">{product.model}</p>
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-playfair text-[#0f2810]">
                ${parseFloat(product.price).toLocaleString()}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#0f2810]/60">Size</p>
                  <p className="text-[#0f2810]">{product.size}</p>
                </div>
                <div>
                  <p className="text-sm text-[#0f2810]/60">Year</p>
                  <p className="text-[#0f2810]">{product.year}</p>
                </div>
                <div>
                  <p className="text-sm text-[#0f2810]/60">Condition</p>
                  <p className="text-[#0f2810]">{product.condition}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-[#0f2810]/60 mb-2">Description</p>
                <p className="text-[#0f2810]/80">{product.description}</p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full flex items-center justify-center rounded-md px-5 py-2.5 text-sm 
                  font-medium transition duration-200 ${
                    isInCart
                      ? "bg-[#0f2810]/10 text-[#0f2810] cursor-not-allowed"
                      : "bg-[#0f2810] text-white hover:bg-[#1a3a1a]"
                  }`}
              >
                {isInCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart
                      className={`mr-2 h-5 w-5 ${isAdded ? "animate-bounce" : ""}`}
                    />
                    {isAdded ? "Added!" : "Add to Cart"}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
