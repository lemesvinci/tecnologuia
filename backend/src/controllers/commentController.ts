// backend/src/controllers/commentController.ts
import { Request, Response, NextFunction } from "express";
import db from "../config/database";

interface CommentRequest extends Request {
  user?: { id: number; role?: string };
}

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comments = await db.any(`
      SELECT comments.id, comments.content, comments.createdAt, comments.userId, users.name AS userName
      FROM comments
      JOIN users ON comments.userId = users.id
      ORDER BY comments.createdAt DESC
    `);

    // Garantir que a data esteja sempre em ISO
    const formattedComments = comments.map((comment: any) => ({
      ...comment,
      createdAt: comment.createdAt
        ? new Date(comment.createdAt).toISOString()
        : new Date().toISOString(),
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
  const { content } = req.body;
  const userId = req.user?.id;

  if (!content) {
    res.status(400).json({ message: "O conteúdo do comentário é obrigatório" });
    return;
  }

  try {
    const createdAt = new Date();

    const newComment = await db.one(
      "INSERT INTO comments(content, userId, createdAt) VALUES($1, $2, $3) RETURNING id, content, userId, createdAt",
      [content, userId, createdAt]
    );

    const commentWithUser = await db.one(
      `
      SELECT comments.id, comments.content, comments.createdAt, comments.userId, users.name AS userName
      FROM comments
      JOIN users ON comments.userId = users.id
      WHERE comments.id = $1
    `,
      [newComment.id]
    );

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

    commentWithUser.createdAt = formatDateToISO(commentWithUser.createdAt);

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error("Erro ao criar comentário:", error); // Log 4: Verificar o erro
    res.status(500).json({ message: "Erro ao criar comentário" });
  }
};

export const deleteComment = async (
  req: CommentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params; // ID do comentário a ser excluído
  const userId = req.user?.id; // ID do usuário autenticado
  const userRole = req.user?.role; // Papel do usuário (user ou admin)

  try {
    // Buscar o comentário para verificar se ele existe e quem é o autor
    const comment = await db.oneOrNone(
      "SELECT userId FROM comments WHERE id = $1",
      [id]
    );

    if (!comment) {
      res.status(404).json({ message: "Comentário não encontrado" });
      return;
    }

    // Verificar se o usuário é o autor do comentário ou um administrador
    if (comment.userId !== userId && userRole !== "admin") {
      res.status(403).json({
        message: "Você não tem permissão para excluir este comentário",
      });
      return;
    }

    // Excluir o comentário
    await db.none("DELETE FROM comments WHERE id = $1", [id]);

    res.status(200).json({ message: "Comentário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir comentário:", error);
    res.status(500).json({ message: "Erro ao excluir comentário" });
  }
};
