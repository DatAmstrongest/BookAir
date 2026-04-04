import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';
import connectDB from './config/db'

const cors = require('cors');

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS explicitly
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB();


app.use('/api', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is whispering sweet nothings at http://localhost:${PORT}`);
});
