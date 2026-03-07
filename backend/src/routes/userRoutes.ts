import { Router, Request, Response } from 'express';
import { userController } from '../controllers/userController'
const router: Router = Router();

router.post("/login", userController.login);

export default router;
