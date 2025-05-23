/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db, { pgp } from "../config/database";
import { sendResetPasswordEmail } from "../config/email";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_jwt";

// Interface para tipar o usuário
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  occupation?: string;
  bio?: string;
  role?: string;
}

// Interface para tipar a requisição com o usuário
interface AuthRequest extends Request {
  user?: { id: number; email: string; role?: string };
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;

  console.log("Dados recebidos: ", { name, email, password });

  if (!name || !email || !password) {
    res.status(400).json({ message: "Preencha todos os campos" });
    return;
  }

  try {
    // Verificar se o email já existe
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log("Usuário existente: ", existingUser);
    if (existingUser) {
      res.status(400).json({ message: "Email já registrado" });
      return;
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Senha criptografada: ", hashedPassword);
    // Inserir o novo usuário
    const newUser = await db.one(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", user: newUser });
  } catch (error: any) {
    console.error("Erro:", error);
    res
      .status(500)
      .json({ message: "Erro no servidor", detail: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  console.log("Tentando login com:", { email });

  if (!email || !password) {
    res.status(400).json({ message: "Preencha todos os campos" });
    return;
  }

  try {
    const user = await db.oneOrNone<User>(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    console.log("Usuário encontrado:", user ? "Sim" : "Não");
    if (!user) {
      res.status(400).json({ message: "Email ou senha incorretos" });
      return;
    }
    if (!user) {
      res.status(400).json({ message: "Email ou senha incorretos" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Email ou senha incorretos" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token gerado:", token);
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
      },
    });
  } catch (error: any) {
    console.error("Erro:", error);
    res
      .status(500)
      .json({ message: "Erro no servidor", detail: error.message });
  }
};

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(200).json({ message: "Logout realizado com sucesso" });
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;

  try {
    const user = await db.one(
      "SELECT id, name, email, phone, location, occupation, bio, role FROM users WHERE id = $1",
      [userId]
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email é obrigatório" });
    return;
  }

  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    // Gerar um token de redefinição com expiração de 1 hora
    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Armazenar o token no banco (você pode criar uma tabela para tokens de redefinição ou atualizar o usuário)
    await db.none("UPDATE users SET resetToken = $1 WHERE id = $2", [
      resetToken,
      user.id,
    ]);

    // Enviar email com o link de redefinição
    await sendResetPasswordEmail(email, resetToken);

    res
      .status(200)
      .json({ message: "Email de redefinição enviado com sucesso" });
  } catch (error) {
    console.error("Erro ao processar esqueci minha senha:", error);
    res.status(500).json({ message: "Erro ao processar solicitação" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: "Token e nova senha são obrigatórios" });
    return;
  }

  try {
    // Verificar o token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE id = $1 AND resetToken = $2",
      [decoded.userId, token]
    );

    if (!user) {
      res.status(400).json({ message: "Token inválido ou expirado" });
      return;
    }

    // Atualizar a senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.none(
      "UPDATE users SET password = $1, resetToken = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ message: "Erro ao redefinir senha" });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const { name, phone, location, occupation, bio } = req.body;

  try {
    const updatedUser = await db.one(
      "UPDATE users SET name = $1, phone = $2, location = $3, occupation = $4, bio = $5 WHERE id = $6 RETURNING id, name, email, phone, location, occupation, bio, role",
      [name, phone, location, occupation, bio, userId]
    );
    res
      .status(200)
      .json({ message: "Perfil atualizado com sucesso", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil" });
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await db.any(
      "SELECT id, name, email, phone, location, occupation, bio, role FROM users"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};
