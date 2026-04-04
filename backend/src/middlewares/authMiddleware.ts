import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtUserPayload } from '../utils/token';

declare global {
	namespace Express {
		interface Request {
			auth?: JwtUserPayload;
		}
	}
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
	const header = req.headers.authorization;
	if (!header?.startsWith('Bearer ')) {
		res.status(401).json({ error: 'Authentication required' });
		return;
	}
	const token = header.slice(7).trim();
	if (!token) {
		res.status(401).json({ error: 'Authentication required' });
		return;
	}
	try {
		req.auth = verifyAccessToken(token);
		next();
	} catch {
		res.status(401).json({ error: 'Invalid or expired token' });
	}
}
