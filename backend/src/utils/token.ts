import jwt from 'jsonwebtoken';

export interface JwtUserPayload {
	sub: string;
	email: string;
}

function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET is not configured');
	}
	return secret;
}

export function signAccessToken(userId: string, email: string): string {
	const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
	return jwt.sign({ sub: userId, email }, getJwtSecret(), { expiresIn });
}

export function verifyAccessToken(token: string): JwtUserPayload {
	return jwt.verify(token, getJwtSecret()) as JwtUserPayload;
}
