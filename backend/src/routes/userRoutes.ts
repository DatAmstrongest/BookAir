import { Router, Request, Response } from 'express';
import { userController } from '../controllers/userController'
const router: Router = Router();

router.get('/user/:email', userController.getUser);

export default router;
