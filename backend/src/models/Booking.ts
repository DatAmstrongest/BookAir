import { Schema, model } from 'mongoose';
import { IBooking } from '../interfaces/database/IBooking';

const BookingSchema = new Schema<IBooking>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Booking = model<IBooking>('Booking', BookingSchema);
