import express from 'express';
import dotenv from "dotenv";
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import connectDB from "./db/connect.js";
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

const app = express()
dotenv.config();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 8080;

// ha van adatbázisunk csak akkor inditjuk a 8000 portot
const start = async () => {
    try {
      await connectDB();
      app.listen(port, console.log(`Server listening on port ${port}`));
    } catch (err) {
      console.log(err);
    }
  };
  
  start();