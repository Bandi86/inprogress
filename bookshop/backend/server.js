import express from 'express'
import db from './db/config.js'
import userRouter from './routes/user.js'

import cors from 'cors'

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/user', userRouter)

const PORT = process.env.PORT || 8080

//sync database
db.sync()
  .then((result) => {
    console.log('Database connected')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`)
    })
  })
  .catch((err) => console.log(err))
