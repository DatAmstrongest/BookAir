import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use('/api', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is whispering sweet nothings at http://localhost:${port}`);
});
