import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    totalAmount: Number,
    quantity: Number,
    products: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;