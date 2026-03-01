import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/database/IUser';

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	birthDate: {
		type: Date,
		required: true
	},
	passwordHash: {
		type: String,
		reqiured: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export const User = model<IUser>('User', UserSchema);
