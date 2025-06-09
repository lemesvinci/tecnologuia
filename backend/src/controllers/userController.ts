import { Request, Response, NextFunction } from 'express';
import db from '../config/database';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role?: string;
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await db.any<User>(
      `
      SELECT id, name, email, createdAt, role
      FROM users
      WHERE createdAt IS NOT NULL
      ORDER BY createdAt DESC
      `
    );

    const formattedUsers = users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).toISOString(),
    }));

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(formattedUsers);
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', { error: error.message, stack: error.stack });
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};