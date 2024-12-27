import { Router } from 'express';
import { getHealthMetrics } from '../controllers/healthController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/health',authenticate, getHealthMetrics);

export default router;
