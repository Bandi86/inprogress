import express from 'express';
import winston from 'winston';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import connectDB from './config/connect.js';
import authMiddleware from './middleware/auth.js';
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';
import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';
import categoryRouter from './routes/categories.js';
import favoritesRouter from './routes/favorites.js';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';
import getUserActivity from './controllers/userActivity.js';
import logUserActivity from './middleware/logUserActivity.js';

dotenv.config();

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(logUserActivity);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/favorites', authMiddleware, favoritesRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/user-activity', authMiddleware, getUserActivity);
app.use('/api/v1/users', userRouter);

app.use(notFound);
app.use(errorHandler);

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
