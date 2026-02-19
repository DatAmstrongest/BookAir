import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUserByEmail(req.params.email);
      
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
};
