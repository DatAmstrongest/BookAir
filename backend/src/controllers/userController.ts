import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  const user = await UserService.findById(req.params.id);
  res.json(user);
};
