import mongoose, { mongo } from "mongoose";
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "",
      required: false,
    },
    year: {
      type: String,
      default: "",
      required: false,
    },
    condition: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: Buffer,
      required: [true, "image required"],
    },
    imageType: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
