import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  const user = await UserService.getUserByEmail(req.params.email);
  res.json(user);
};
