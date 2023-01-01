import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getCategory,
  getBrand,
  postCategory,
  postBrand,
  createProducts,
  updateProducts,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", createProducts);
router.post("/products/:id", updateProducts);
router.get("/category", getCategory);
router.post("/category", postCategory);
router.get("/brand", getBrand);
router.post("/brand", postBrand);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
