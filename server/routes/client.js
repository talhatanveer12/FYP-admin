import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getCategory,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/category", getCategory);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
