// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/database";
import { sendResetPasswordEmail } from "../config/email";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado");
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  location?: string | null;
  occupation?: string | null;
  bio?: string | null;
  role: string;
  createdAt: string;
}

interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

/**
 * Valida se a senha atende aos critérios de segurança
 * @param password Senha a ser validada
 * @returns Objeto com status e mensagem de erro, se aplicável
 */
const validatePassword = (password: string) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `A senha deve ter pelo menos ${minLength} caracteres`,
    };
  }
  if (!hasUpperCase) {
    return {
      isValid: false,
      message: "A senha deve conter pelo menos uma letra maiúscula",
    };
  }
  if (!hasLowerCase) {
    return {
      isValid: false,
      message: "A senha deve conter pelo menos uma letra minúscula",
    };
  }
  if (!hasNumber) {
    return {
      isValid: false,
      message: "A senha deve conter pelo menos um número",
    };
  }
  if (!hasSymbol) {
    return {
      isValid: false,
      message: "A senha deve conter pelo menos um símbolo (ex.: !@#$%)",
    };
  }

  return { isValid: true, message: "" };
};

/**
 * @desc Registra um novo usuário
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, location, occupation, bio } = req.body;

  // Validação de campos obrigatórios
  if (!name || !email || !password) {
    res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
    return;
  }

  // Validação da senha
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    res.status(400).json({ message: passwordValidation.message });
    return;
  }

  try {
    const existingUser = await db.oneOrNone(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (existingUser) {
      res.status(409).json({ message: "Email já registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.one(
      `INSERT INTO users (name, email, password, phone, location, occupation, bio, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'user', NOW())
       RETURNING id, name, email, phone, location, occupation, bio, role, created_at AS createdAt`,
      [name, email, hashedPassword, phone, location, occupation, bio]
    );

    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", user: newUser });
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", {
      error: error.message,
      stack: error.stack,
    });
    if (error.code === "23505") {
      res.status(409).json({ message: "Email já registrado" });
    } else {
      res.status(500).json({ message: "Erro interno ao registrar usuário" });
    }
  }
};

/**
 * @desc Autentica um usuário
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios" });
    return;
  }

  try {
    const user = await db.oneOrNone<User>(
      `SELECT id, name, email, password, phone, location, occupation, bio, role, created_at AS createdAt
       FROM users WHERE email = $1`,
      [email]
    );
    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        occupation: user.occupation,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Erro ao fazer login:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao fazer login" });
  }
};

/**
 * @desc Obtém o perfil do usuário autenticado
 * @route GET /api/auth/profile
 */
export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  try {
    const user = await db.one<User>(
      `SELECT id, name, email, phone, location, occupation, bio, role, created_at AS createdAt
       FROM users WHERE id = $1`,
      [userId]
    );
    res.status(200).json(user);
  } catch (error: any) {
    console.error("Erro ao buscar perfil:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao buscar perfil" });
  }
};

/**
 * @desc Solicita redefinição de senha
 * @route POST /api/auth/forgot-password
 */
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email é obrigatório" });
    return;
  }

  try {
    const user = await db.oneOrNone("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    await db.none("UPDATE users SET reset_token = $1 WHERE id = $2", [
      resetToken,
      user.id,
    ]);
    await sendResetPasswordEmail(email, resetToken);

    res
      .status(200)
      .json({ message: "Email de redefinição enviado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao processar esqueci minha senha:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao processar solicitação" });
  }
};

/**
 * @desc Redefine a senha com token
 * @route POST /api/auth/reset-password
 */
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: "Token e nova senha são obrigatórios" });
    return;
  }

  // Validação da nova senha
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    res.status(400).json({ message: passwordValidation.message });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    const user = await db.oneOrNone(
      "SELECT id FROM users WHERE id = $1 AND reset_token = $2",
      [decoded.userId, token]
    );

    if (!user) {
      res.status(400).json({ message: "Token inválido ou expirado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.none(
      "UPDATE users SET password = $1, reset_token = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error: any) {
    console.error("Erro ao redefinir senha:", {
      error: error.message,
      stack: error.stack,
    });
    res
      .status(400)
      .json({ message: "Token inválido ou erro ao redefinir senha" });
  }
};

/**
 * @desc Atualiza o perfil do usuário
 * @route PUT /api/auth/profile
 */
export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const { name, phone, location, occupation, bio } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  try {
    const updatedUser = await db.one(
      `UPDATE users
       SET name = COALESCE($1, name), phone = COALESCE($2, phone), location = COALESCE($3, location),
           occupation = COALESCE($4, occupation), bio = COALESCE($5, bio)
       WHERE id = $6
       RETURNING id, name, email, phone, location, occupation, bio, role, created_at AS createdAt`,
      [name, phone, location, occupation, bio, userId]
    );

    res
      .status(200)
      .json({ message: "Perfil atualizado com sucesso", user: updatedUser });
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao atualizar perfil" });
  }
};

/**
 * @desc Lista todos os usuários (apenas admin)
 * @route GET /api/auth/users
 */
export const getUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user || req.user.role !== "admin") {
    res
      .status(403)
      .json({ message: "Apenas administradores podem acessar esta rota" });
    return;
  }

  try {
    const users = await db.any<User>(
      `SELECT id, name, email, role, created_at AS createdAt
       FROM users ORDER BY name ASC`
    );
    if (users.length === 0) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
      return;
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao buscar usuários" });
  }
};
