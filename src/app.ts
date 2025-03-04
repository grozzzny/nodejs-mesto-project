import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import cardsRouter from './routes/cards'
import path from 'path'
import { UserRequest } from './types'
import { handleError } from './controllers/errors'

const { PORT = 3000 } = process.env

const app = express()

mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.error(err))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Runtime
app.use((req: UserRequest, res, next) => {
  req.user = {
    _id: '67c74a2d9a9526e3002cda4e'
  }

  next()
})

// Routes
app.use('/cards', cardsRouter)
app.use('/users', usersRouter)

// Static
app.use(express.static(path.join(__dirname, '..', 'public')))

// Handler errors
app.use(handleError)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
