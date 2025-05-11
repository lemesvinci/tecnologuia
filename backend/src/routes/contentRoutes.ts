// backend/src/routes/contentRoutes.ts
import { Router } from 'express';
import { getContents, createContent } from '../controllers/contentController';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = Router();

router.get('/', getContents);
router.post('/', authMiddleware, adminMiddleware, createContent);

export default router;