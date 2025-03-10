import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { motion } from "framer-motion";
import hero from "../../public/hero.jpg";
const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, isLoading } =
    useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[66vh]">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0f2810]/30" /> {/* Overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair text-white font-light mb-6">
              Timeless Elegance
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              Discover our curated collection of luxury timepieces
            </p>
            <motion.a
              href="/products"
              className="inline-block bg-white text-[#0f2810] px-8 py-3 rounded-md 
                text-lg font-medium hover:bg-[#0f2810] hover:text-white 
                transition duration-200 border border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[2px] h-8 bg-white/50 mx-auto" />
        </motion.div>
      </div>
      Featured Products Section
      <div id="featured" className="bg-white">
        {!isLoading && featuredProducts.length > 0 && <FeaturedProducts />}
      </div>
    </div>
  );
};
export default HomePage;
