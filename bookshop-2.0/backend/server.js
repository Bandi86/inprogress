import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import connectDB from "./config/connect.js"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(cors())

app.use(rateLimit({
    windowMs: 15 * 60* 1000,
    max: 100
  }))



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