import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { errors } from 'celebrate'
import cardsRouter from './routes/cards'
import usersRouter from './routes/users'
import { handleError } from './controllers/errors'
import { createUser, login } from './controllers/users'
import { auth } from './middlewares/auth'
import { errorLogger, requestLogger } from './middlewares/logger'
import { signInValidation, signUpValidation } from './middlewares/validations'

const { PORT = 3000 } = process.env

const app = express()

mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.error(err))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logger
app.use(requestLogger)

// Routes
app.use('/cards', auth, cardsRouter)
app.use('/users', auth, usersRouter)
app.post('/signin', signInValidation(), login)
app.post('/signup', signUpValidation(), createUser)

// Logger
app.use(errorLogger)

// Handler errors
app.use(errors())
app.use(handleError)

// Static
app.use(express.static(path.join(__dirname, '..', 'public')))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
