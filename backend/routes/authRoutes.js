import expess from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = expess.Router();

router.post("/signup" , signup );
router.post("/login" , login);
router.post("/logout" , logout);

export default router;