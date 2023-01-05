import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    totalAmount: Number,
    quantity: Number,
  });


const LedgerSchema = new mongoose.Schema(
  {
    userId: String,
    total: Number,
    products: {
        type: [ProductSchema],
      },
  },
  { timestamps: true }
);

const Ledger = mongoose.model("Ledger", LedgerSchema);
export default Ledger;