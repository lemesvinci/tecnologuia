import { Request, Response, NextFunction } from "express";
import db from "../config/database";

interface CommentRequest extends Request {
  user?: { id: number; email: string; role?: string };
}

interface Comment {
  id: number;
  content: string;
  userId: number;
  areaId: number;
  createdAt: string;
  userName: string;
}

const formatDateToISO = (
  dateInput: string | Date | undefined | null
): string => {
  if (!dateInput) {
    return new Date().toISOString();
  }
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error(`Formato de data inválido: ${dateInput}`);
  }
  return date.toISOString();
};

export const getAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const areas = await db.any("SELECT * FROM areas");
    res.status(200).json(areas);
  } catch (error: any) {
    console.error("Erro ao buscar áreas:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Erro ao buscar áreas" });
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { areaId } = req.query;

  if (!areaId || isNaN(Number(areaId))) {
    res.status(400).json({ message: "ID da área inválido" });
    return;
  }

  try {
    const comments = await db.any<Comment>(
      `
      SELECT comments.id, comments.content, comments.createdAt, comments.userId, comments.areaId, users.name AS userName
      FROM comments
      JOIN users ON comments.userId = users.id
      WHERE comments.areaId = $1 AND comments.createdAt IS NOT NULL
      ORDER BY comments.createdAt DESC
    `,
      [Number(areaId)]
    );

    const formattedComments = comments.map((comment) => ({
      ...comment,
      createdAt: formatDateToISO(comment.createdAt),
    }));

    res.status(200).json(formattedComments);
  } catch (error: any) {
    console.error("Erro ao buscar comentários:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Erro ao buscar comentários" });
  }
};

export const createComment = async (
  req: CommentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { content, areaId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }
  if (!content || !areaId || isNaN(Number(areaId))) {
    res.status(400).json({ message: "Conteúdo e ID da área são obrigatórios e devem ser válidos" });
    return;
  }

  try {
    const createdAt = new Date();
    const newComment = await db.one(
      "INSERT INTO comments(content, userId, areaId, createdAt) VALUES($1, $2, $3, $4) RETURNING id, content, userId, areaId, createdAt",
      [content, userId, Number(areaId), createdAt]
    );

    const commentWithUser = await db.one<Comment>(
      `
      SELECT comments.id, comments.content, comments.createdAt, comments.userId, comments.areaId, users.name AS userName
      FROM comments
      JOIN users ON comments.userId = users.id
      WHERE comments.id = $1
    `,
      [newComment.id]
    );

    commentWithUser.createdAt = formatDateToISO(commentWithUser.createdAt);

    res.status(201).json(commentWithUser);
  } catch (error: any) {
    console.error("Erro ao criar comentário:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Erro ao criar comentário" });
  }
};

export const deleteComment = async (
  req: CommentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ message: "ID do comentário inválido" });
    return;
  }

  try {
    const comment = await db.oneOrNone(
      "SELECT userId FROM comments WHERE id = $1",
      [Number(id)]
    );

    if (!comment) {
      res.status(404).json({ message: "Comentário não encontrado" });
      return;
    }

    if (comment.userId !== userId && userRole !== "admin") {
      res
        .status(403)
        .json({
          message: "Você não tem permissão para excluir este comentário",
        });
      return;
    }

    await db.none("DELETE FROM comments WHERE id = $1", [Number(id)]);

    res.status(200).json({ message: "Comentário excluído com sucesso" });
  } catch (error: any) {
    console.error("Erro ao excluir comentário:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Erro ao excluir comentário" });
  }
};