// backend/src/routes/commentRoutes.ts
import { Router } from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rota para buscar todos os comentários (não requer autenticação)
router.get('/', getComments);

// Rota para adicionar um novo comentário (requer autenticação)
router.post('/', authMiddleware, createComment);

// Rota para deletar um comentário (requer autenticação)
router.delete('/:id', authMiddleware, deleteComment);

export default router;