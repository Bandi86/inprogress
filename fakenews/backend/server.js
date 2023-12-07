import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './db/config.js';
import logger from 'morgan';
import userRouter from './routes/user.js';
import articleRouter from './routes/article.js';
import { loginUser, logoutUser } from './controllers/userController.js';
import commentsReplyRouter from './routes/comments.js';
import { profileRouter } from './controllers/profileRouter.js';
import tagRouter from './routes/tag.js'
import categoryRouter from './routes/category.js'

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  // handle error
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
  next();
});

app.use(logger('dev'));

// ROUTES
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to application.' });
});

//users
app.use('/users', userRouter);
// auth
app.use('/login', loginUser);
app.use('/logout', logoutUser);
//article
app.use('/articles', articleRouter);
//comments
app.use('/comments', commentsReplyRouter);
//profile
app.use('/profile/:id', profileRouter);
//tags
app.use('/tags', tagRouter)
app.use('/categories', categoryRouter)


//sync database
db.sync()
  .then((result) => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));
