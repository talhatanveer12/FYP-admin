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
  deleteProduct,
  createInvoice,
  getInvoice,
  getLedger,
} from "../controllers/client.js";
import multer from "multer";

const router = express.Router();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(".");
    cb(null, name[0] + "-" + Date.now() + "." + name[1]);
  },
});

const upload = multer({ storage: storage });

router.get("/products", getProducts);
router.post("/products",upload.single("image"), createProducts);
router.post("/products/:id",upload.single("image"), updateProducts);
router.delete("/products/:id",deleteProduct);
router.get("/category", getCategory);
router.post("/category", postCategory);
router.get("/brand", getBrand);
router.post("/brand", postBrand);
router.get("/invoice",getInvoice);
router.post("/invoice",createInvoice);
router.get("/ledger",getLedger);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
