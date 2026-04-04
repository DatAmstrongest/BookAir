import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', requireAuth, bookingController.list);

export default router;
