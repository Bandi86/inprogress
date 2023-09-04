import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import connectDB from "./config/connect.js";
import authMiddleware from './middleware/auth.js';
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60* 1000,
  max: 100
}))


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authMiddleware, booksRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
