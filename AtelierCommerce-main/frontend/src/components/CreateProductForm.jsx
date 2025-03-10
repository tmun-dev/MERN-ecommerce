import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const CreateProductForm = () => {
  const year = new Date().getFullYear();
  let lowerend = 1940;
  let range = year - lowerend + 1;
  const [newProduct, setNewProduct] = useState({
    brand: "",
    model: "",
    size: "",
    year: "",
    condition: "",
    description: "",
    price: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        brand: "",
        model: "",
        size: "" + "mm",
        year: "",
        condition: "",
        description: "",
        price: "",
        image: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as Base64
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          // const base64String = reader.result.split(",")[1]; // Extract Base64 data

          // setNewProduct({ ...newProduct, image: base64String });

          setNewProduct({ ...newProduct, image: reader.result });
        }
      };
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto border border-[#9ca]/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-playfair text-[#0f2810] font-light mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-[#0f2810]"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            className="mt-1 block w-full bg-white border border-[#9ca]/20 rounded-md shadow-sm py-2
              px-3 text-[#0f2810] focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-[#0f2810]"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={newProduct.model}
            onChange={(e) =>
              setNewProduct({ ...newProduct, model: e.target.value })
            }
            className="mt-1 block w-full bg-white border border-[#9ca]/20 rounded-md shadow-sm py-2
              px-3 text-[#0f2810] focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
            required
          />
        </div>
        <div className="flex flex-row gap-x-4">
          <div className="">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-[#0f2810]"
            >
              Size
            </label>
            <select
              className="text-[#0f2810] bg-white border border-1 mr-1 "
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
            >
              <option value="">None</option>
              {Array.from({ length: 41 }, (_, i) => 20 + i).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            mm
          </div>
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-[#0f2810]"
            >
              Year
            </label>
            <select
              className="text-[#0f2810] bg-white border  border-1 mr-1 "
              onChange={(e) =>
                setNewProduct({ ...newProduct, year: e.target.value })
              }
            >
              <option value="">None</option>
              {Array.from({ length: range }, (_, i) => lowerend + i).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-[#0f2810]"
          >
            Condition
          </label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={newProduct.condition}
            onChange={(e) =>
              setNewProduct({ ...newProduct, condition: e.target.value })
            }
            className="mt-1 block w-full bg-white border border-[#9ca]/20 rounded-md shadow-sm py-2
              px-3 text-[#0f2810] focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#0f2810]"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-white border border-[#9ca]/20 rounded-md shadow-sm
              py-2 px-3 text-[#0f2810] focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-[#0f2810]"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-white border border-[#9ca]/20 rounded-md shadow-sm 
              py-2 px-3 text-[#0f2810] focus:outline-none focus:ring-2 focus:ring-[#9ca]
              focus:ring-offset-2"
            required
          />
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-white border border-[#9ca]/20 py-2 px-3 rounded-md shadow-sm 
              text-sm leading-4 font-medium text-[#0f2810] hover:bg-[#0f2810] hover:text-white 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-[#0f2810]/60">
              Image uploaded
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 rounded-md shadow-sm text-sm font-medium 
            text-white bg-[#0f2810] hover:bg-[#1a3a1a] transition duration-200 
            focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default CreateProductForm;
