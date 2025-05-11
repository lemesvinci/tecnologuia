// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Interface para tipar o usuário decodificado do token
interface UserPayload {
  id: number;
  email: string;
}

// Estender a interface Request para incluir o user
interface AuthRequest extends Request {
  user?: UserPayload;
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_jwt';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
};