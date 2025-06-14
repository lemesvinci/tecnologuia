import { Request, Response, NextFunction } from "express";
import db from "../config/database";

// Interface para requisição autenticada
interface CommentRequest extends Request {
  user?: { id: number; email: string; role: string }; // Role é obrigatório
}

// Interface para área
interface Area {
  id: number;
  name: string;
  description: string;
  videoLink?: string; // Compatível com Comments.tsx
}

// Interface para comentário (padroniza camelCase)
interface Comment {
  id: number;
  content: string;
  userId: number;
  areaId: number;
  createdAt: string;
  userName: string;
}

// Formata data para ISO
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

// Valida se a área existe no banco
const validateAreaId = async (areaId: number): Promise<boolean> => {
  const area = await db.oneOrNone("SELECT id FROM areas WHERE id = $1", [
    areaId,
  ]);
  return !!area;
};

/**
 * @desc Retorna todas as áreas disponíveis
 * @route GET /api/comments/areas
 */
export const getAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const areas: Area[] = await db.any(
      "SELECT id, name, description, video_link AS videoLink FROM areas"
    );
    if (areas.length === 0) {
      res.status(404).json({ message: "Nenhuma área encontrada" });
      return;
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(areas);
  } catch (error: any) {
    console.error("Erro ao buscar áreas:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao buscar áreas" });
  }
};

/**
 * @desc Retorna comentários de uma área específica
 * @route GET /api/comments?areaId=:id
 */
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

  const areaIdNum = Number(areaId);
  if (!(await validateAreaId(areaIdNum))) {
    res.status(404).json({ message: "Área não encontrada" });
    return;
  }

  try {
    const comments: Comment[] = await db.any(
      `
      SELECT 
        c.id, 
        c.content, 
        c.created_at AS "createdAt", 
        c.user_id AS "userId", 
        c.area_id AS "areaId", 
        u.name AS "userName"
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.area_id = $1
      ORDER BY c.created_at DESC
    `,
      [areaIdNum]
    );

    const formattedComments = comments.map((comment) => ({
      ...comment,
      createdAt: formatDateToISO(comment.createdAt),
    }));

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(formattedComments);
  } catch (error: any) {
    console.error("Erro ao buscar comentários:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Erro interno ao buscar comentários" });
  }
};

/**
 * @desc Cria um novo comentário
 * @route POST /api/comments
 */
export const createComment = async (
  req: CommentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { content, areaId } = req.body;
  const userId = req.user?.id;
  const userName = req.user?.email; // Ajuste para username, se disponível

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }
  if (!content || !areaId || isNaN(Number(areaId))) {
    res.status(400).json({ message: "Conteúdo e ID da área são obrigatórios" });
    return;
  }

  const areaIdNum = Number(areaId);
  if (!(await validateAreaId(areaIdNum))) {
    res.status(404).json({ message: "Área não encontrada" });
    return;
  }

  try {
    const newComment = await db.one<Comment>(
      `
      INSERT INTO comments(content, user_id, area_id, created_at)
      VALUES($1, $2, $3, NOW())
      RETURNING 
        id, 
        content, 
        created_at AS "createdAt", 
        user_id AS "userId", 
        area_id AS "areaId",
        (SELECT name FROM users WHERE id = $2) AS "userName"
    `,
      [content, userId, areaIdNum]
    );

    newComment.createdAt = formatDateToISO(newComment.createdAt);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(201).json(newComment);
  } catch (error: any) {
    console.error("Erro ao criar comentário:", {
      error: error.message,
      stack: error.stack,
    });
    if (error.code === "23503") {
      // Violação de chave estrangeira
      res.status(400).json({ message: "Área ou usuário inválido" });
    } else {
      res.status(500).json({ message: "Erro interno ao criar comentário" });
    }
  }
};

/**
 * @desc Exclui um comentário
 * @route DELETE /api/comments/:id
 */
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
  if (userRole !== "admin") {
    res.status(403).json({ message: "Apenas administradores podem excluir comentários" });
    return;
  }

  const commentId = Number(id);

  try {
    const comment = await db.oneOrNone<{ userId: number; areaId: number }>(
      "SELECT user_id AS userId, area_id AS areaId FROM comments WHERE id = $1",
      [commentId]
    );

    if (!comment) {
      res.status(404).json({ message: "Comentário não encontrado" });
      return;
    }

    await db.none("DELETE FROM comments WHERE id = $1", [commentId]);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ message: "Comentário excluído com sucesso" });
  } catch (error: any) {
    console.error("Erro ao excluir comentário:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Erro interno ao excluir comentário" });
  }
};