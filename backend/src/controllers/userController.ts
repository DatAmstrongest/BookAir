import { Request, Response } from 'express';
import * as argon2 from "argon2";

import UserService from '../services/userService';
import { ILoginDTO } from "../interfaces/request/ILoginDTO"
import { IRegisterDTO } from "../interfaces/request/IRegisterDTO";
import { signAccessToken } from '../utils/token';

export const userController = {
  login: async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
    const {email, password} = req.body;
    const user = await UserService.getUserByEmail(email);
    if(!user){
      return res.status(401).json({ error: "Email or password is wrong" });
    }
    const isCorrect = await argon2.verify(user.passwordHash, password);
    if (isCorrect) {
      let token: string;
      try {
        token = signAccessToken(String(user._id), user.email);
      } catch {
        return res.status(500).json({ error: 'Server configuration error' });
      }
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: { email: user.email },
      });
    }
    else{
      return res.status(401).json({ error: "Email or password is wrong" })
    }
  },

  register: async (req: Request<{}, {}, IRegisterDTO>, res: Response) => {
    const { name, surname, email, password, birthDate} = req.body;
    const existing = await UserService.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const passwordHash = await argon2.hash(password);
    try{
      const newUser = await UserService.createUser(name, surname, email, birthDate, passwordHash )
      res.status(201).json({ message: 'User created', userId: newUser!._id });
    }
    catch{
      res.status(404).json({ message: 'Something went wrong'});

    }

  }
};
