import { User } from '../models/User';
import { IUser } from '../interfaces/database/IUser';

export default class UserService {
	public static async getUserByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({email}).exec();
	}
	
	public static async createUser(name: string, surname: string, email:string, birthDate: Date, passwordHash: string): Promise<IUser | null> {
			const newUser = new User({name, surname, email, birthDate, passwordHash});
			newUser.save()
			return newUser;

	}
}
