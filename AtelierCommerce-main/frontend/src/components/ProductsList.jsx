import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
  console.log("products", products);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto border border-[#9ca]/20 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-[#9ca]/10">
        <thead className="bg-[#0f2810]/5">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Product
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Brand
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Model
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-[#9ca]/10">
          {products?.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-[#0f2810]/5 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={`data:${product.imageType};base64,${product.image}`}
                      alt={product.brand}
                    />
                  </div>
                  <div className="ml-4"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#0f2810]">{product.model}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full transition-colors duration-200 
                    ${
                      product.isFeatured
                        ? "bg-[#0f2810] text-white"
                        : "bg-white text-[#0f2810] border border-[#9ca]/20"
                    } hover:bg-[#1a3a1a] hover:text-white`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="text-sm text-[#0f2810]">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-[#0f2810]/70 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
export default ProductsList;
