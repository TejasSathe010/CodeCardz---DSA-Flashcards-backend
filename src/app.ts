import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import problemRoutes from './routes/problemRoutes';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api', problemRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the DSA Flashcard App Backend!');
});

export default app;
