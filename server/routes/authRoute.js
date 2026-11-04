import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../controller/authController.js";


const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", requireAuth, getCurrentUser);
export default router;
