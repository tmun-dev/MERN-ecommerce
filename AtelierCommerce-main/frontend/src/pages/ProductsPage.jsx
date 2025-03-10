// import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const { products } = useProductStore();

  return (
    <div className="min-h-screen bg-white px-4 pt-20">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl text-center font-playfair text-[#0f2810] font-light">
          Our Collection
        </h1>
        <p className="text-center text-[#0f2810] text-sm mt-2">
          Discover our curated selection of luxury timepieces
        </p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.length === 0 && (
            <h2 className="text-2xl font-playfair text-[#0f2810] text-center col-span-full">
              No products found
            </h2>
          )}
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </motion.div>
    </div>

  );
};

export default ProductsPage;
