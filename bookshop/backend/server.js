import bodyParser from 'body-parser'
import express from 'express'
import db from './db/config.js'
import bookRouter from './routes/book.js'
import userRouter from './routes/user.js'
import categoryRouter from './routes/categories.js'
import synchronizeModels from './db/sync.js';
import cartRouter from './routes/cart.js'
import commentsRouter from './routes/comments.js'

import cors from 'cors'
import authenticate from './middleware/auth.js'

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/cart', cartRouter)
app.use('/api/comments', authenticate, commentsRouter)

const PORT = process.env.PORT || 8080

//sync database
db.sync()
  .then((result) => {
    console.log('Database connected')
    synchronizeModels();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`)
    })
  })
  .catch((err) => console.log(err))
