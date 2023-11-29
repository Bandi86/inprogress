import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './app/routes/user.js';
import db from './app/db/config.js';
import categoryRouter from './app/routes/category.js';
import questionRouter from './app/routes/questions.js';
import userAnswerRouter from './app/routes/userAnswer.js';


const app = express();

dotenv.config();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:8000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to quiz application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/questions', questionRouter)
app.use('/useranswer', userAnswerRouter)

//sync database
db
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
     
    });
  })
  .catch(err => console.log(err));


