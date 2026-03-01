import { Request, Response } from 'express';
import * as argon2 from "argon2";

import { UserService } from '../services/userService';
import { ILoginDTO } from "../interfaces/request/ILoginDTO"
import { IRegisterDTO } from "../interfaces/request/IRegisterDTO";

export const userController = {
  login: async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
    const {email, password} = req.body;
    const user = await UserService.getUserByEmail(email);
    if(!user){
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const isCorrect = await argon2.verify(user?.passwordHash, password);
    if (isCorrect){
      return res.status(200).json({ message: "Login successful" })
    }
    else{
      return res.status(401).json({ message: "Email or password is wrong" })
    }
  },

  register: async (req: Request<{}, {}, IRegisterDTO>, res: Response) => {

  }
};
