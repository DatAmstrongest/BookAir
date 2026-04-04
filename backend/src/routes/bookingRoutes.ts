import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.get('/', bookingController.list);

export default router;
