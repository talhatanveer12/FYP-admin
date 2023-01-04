import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      unique: false,
    },
    branch: {
      type: String,
      required: true,
      unique: false,
    },
    rating: Number,
    supply: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
