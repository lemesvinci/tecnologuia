// backend/src/middleware/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Interface para tipar o usuário (se necessário)
interface AdminRequest extends Request {
  user?: { id: number; email: string; role?: string };
}

export const adminMiddleware = (req: AdminRequest, res: Response, next: NextFunction): void => {
  const user = req.user;

  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Acesso negado: apenas administradores' });
    return;
  }

  next();
};