import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const formattedProducts = products.map((product) => ({
      ...product._doc, // Spread all product fields
      image: product.image?.toString("base64") || "", // Convert image to Base64
    }));

    res.json({ products: formattedProducts }); // Send formatted products
  } catch (error) {
    console.log("error in getproducts controller");
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    const formattedProducts = featuredProducts.map((product) => ({
      ...product._doc, // Spread all product fields
      image: product.image?.toString("base64") || "", // Convert image to Base64
    }));
    // store in redis for future quick access
    // await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json({ featuredProducts: formattedProducts });
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { brand, model, size, year, condition, description, price, image } =
      req.body;
    // console.log(image);
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      // return res.status(400).json({ error: "Invalid image format" });
      console.log("Error in file format");
    }
    const contentType = matches[1]; // e.g., "image/png"
    const imageBuffer = Buffer.from(matches[2], "base64"); // Convert to binary

    const product = await Product.create({
      brand,
      model,
      size,
      year,
      condition,
      description,
      price,
      image: imageBuffer,
      imageType: contentType,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByBrand = async (req, res) => {
  const { brand } = req.params;
  try {
    const products = await Product.find({ brand });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByBrand controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      // await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    // The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. Significantly improves performance

    const featuredProducts = await Product.find({ isFeatured: true }).lean;
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function");
  }
}
