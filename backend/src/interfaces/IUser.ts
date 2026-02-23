import { Document, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	surname: string;
	email: string;
	birthDate?: Date;
	password: Date;
	createdAt?: Date;
}
