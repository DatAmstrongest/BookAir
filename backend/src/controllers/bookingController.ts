import { Request, Response } from 'express';
import BookingService from '../services/bookingService';

export const bookingController = {
	async list(_req: Request, res: Response): Promise<void> {
		try {
			const bookings = await BookingService.listBookings();
			res.json(bookings);
		} catch {
			res.status(500).json({ error: 'Failed to load bookings' });
		}
	},
};
