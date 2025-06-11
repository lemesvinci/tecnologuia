// backend/src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../config/database";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  occupation?: string;
  bio?: string;
  role?: string;
  createdAt?: string;
}

interface AuthRequest extends Request {
  user?: { id: number; email: string; role?: string };
}

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({
        message: "Acesso negado. Apenas administradores podem visualizar todos os usuários."
      });
      return;
    }

    const users = await db.any<User>(
      `SELECT id, name, email, phone, location, occupation, bio, role, createdAt FROM users ORDER BY name DESC`
    );

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários", detail: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Preencha todos os campos" });
    return;
  }

  try {
    const existingUser = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser) {
      res.status(400).json({ message: "Email já registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.one(
      `INSERT INTO users(name, email, password, createdAt, role)
       VALUES($1, $2, $3, CURRENT_TIMESTAMP, 'user')
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuário registrado com sucesso", user: newUser });
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro no servidor", detail: error.message });
  }
};