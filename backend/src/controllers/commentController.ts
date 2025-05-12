// backend/src/controllers/commentController.ts
import { Request, Response, NextFunction } from "express";
import db from "../config/database";

interface CommentRequest extends Request {
  user?: { id: number; email: string; role?: string };
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

// Novo endpoint para listar áreas
export const getAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const areas = await db.any("SELECT * FROM areas");
    res.status(200).json(areas);
  } catch (error) {
    console.error("Erro ao buscar áreas:", error);
    res.status(500).json({ message: "Erro ao buscar áreas" });
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { areaId } = req.query; // Receber areaId como query parameter

  try {
    const comments = await db.any(
      `
      SELECT comments.id, comments.content, comments.createdAt, comments.userId, comments.areaId, users.name AS userName
      FROM comments
      JOIN users ON comments.userId = users.id
      WHERE comments.areaId = $1 AND comments.createdAt IS NOT NULL
      ORDER BY comments.createdAt DESC
    `,
      [areaId]
    );

    const formattedComments = comments.map((comment: any) => ({
      ...comment,
      createdAt: formatDateToISO(comment.createdAt),
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
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

  if (!content || !areaId) {
    res.status(400).json({ message: "Conteúdo e ID da área são obrigatórios" });
    return;
  }

  try {
    const createdAt = new Date();
    const newComment = await db.one(
      "INSERT INTO comments(content, userId, areaId, createdAt) VALUES($1, $2, $3, $4) RETURNING id, content, userId, areaId, createdAt",
      [content, userId, areaId, createdAt]
    );

    const commentWithUser = await db.one(
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
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
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

  try {
    const comment = await db.oneOrNone(
      "SELECT userId FROM comments WHERE id = $1",
      [id]
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

    await db.none("DELETE FROM comments WHERE id = $1", [id]);

    res.status(200).json({ message: "Comentário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir comentário:", error);
    res.status(500).json({ message: "Erro ao excluir comentário" });
  }
};
