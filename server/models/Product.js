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
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      required: true,
      unique: true,
    },
    rating: Number,
    supply: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
