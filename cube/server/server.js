import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRouter from './routes/users.js'
import db from './db/connection.js'

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080

app.use('/api/user', userRouter)

//sync database
db.sync()
  .then(result => {
    console.log('Database connected')
    //synchronizeModels()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`)
    })
  })
  .catch(err => console.log(err))
