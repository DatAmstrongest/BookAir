import { Request, Response } from 'express';
import * as argon2 from "argon2";

import { UserService } from '../services/userService';
import { ILoginDTO } from "../interfaces/request/ILoginDTO"
import { IRegisterDTO } from "../interfaces/request/IRegisterDTO";
import { User }from '../models/User';

export const userController = {
  login: async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
    return res.status(200).json({message: "Everything is correct"})
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
    const { name, surname, email, password, birthDate} = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const passwordHash = await argon2.hash(password);
    const user = new User({ name, surname, email, birthDate, passwordHash });
    await user.save();

    res.status(201).json({ message: 'User created', userId: user._id });
  }
};
