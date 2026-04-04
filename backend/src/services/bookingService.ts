import { Booking } from '../models/Booking';

export default class BookingService {
	public static async listBookings() {
		return Booking.find().sort({ startDate: 1 }).lean().exec();
	}
}
