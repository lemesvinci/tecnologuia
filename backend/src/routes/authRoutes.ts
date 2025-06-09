import { Router } from "express";
import {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController"; // Verifique se o arquivo está correto
import { authMiddleware } from "../middleware/auth";
import { getUsers } from './../controllers/userController';

const router = Router();

// Definir rotas com prefixo /api implicitamente aplicado em index.ts
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/users", authMiddleware, getUsers); // Rota para listar usuários
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;