import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';

export class UserService {
	public static async getUserByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({email}).exec();
	}
}
