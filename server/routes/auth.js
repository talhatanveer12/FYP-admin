import express from "express";
import { deleteUser, login, register, update } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update/:id", update);
router.delete("/delete/:id",deleteUser);

export default router;