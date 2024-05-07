import expess from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/authController.js";

const router = expess();

router.get("/signup" , signupUser );
router.get("/login" , loginUser);
router.get("/logout" , logoutUser);

export default router;