import { Document, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	createdAt?: Date;
	id: Types.ObjectdId;
}
