import { Router } from 'express';
import { getUser } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/user', authenticate, getUser);

export default router;
