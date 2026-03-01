import { Document, Types } from 'mongoose';

export interface IBooking extends Document {
    title: string,
    description: string,
    category: string,
    startDate: Date,
    endDate: Date,
    status: number,
    updatedAt: Date,
    createdAt: Date
}