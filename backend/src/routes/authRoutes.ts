// backend/src/routes/authRoutes.ts
import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/users", authMiddleware, getAllUsers);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;