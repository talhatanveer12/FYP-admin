import express from "express";
import { deleteUser, login, register, update, UserMe } from "../controllers/auth.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update/:id", update);
router.delete("/delete/:id",deleteUser);
router.get("/me",auth,UserMe);

export default router;